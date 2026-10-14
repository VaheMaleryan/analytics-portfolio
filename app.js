'use strict';
const $ = selector => document.querySelector(selector);
const safe = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const names = {'voiceai-analytics-lab':'VoiceAI Business Intelligence','nyc311-operations-intelligence':'NYC 311 Operations','developer-ecosystem-intelligence':'Developer Ecosystem'};
const colors = ['#087f78','#5688ba','#c58b45'];
let data, plotted;
async function loadJSON(path) { const response=await fetch(path); if(!response.ok) throw new Error(`Could not load ${path}`); return response.json(); }
function projectFilters(){
  document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
    const filter=button.dataset.filter; let count=0;
    document.querySelectorAll('.project').forEach(card=>{card.hidden=filter!=='all'&&card.dataset.kind!==filter;if(!card.hidden)count++;});
    document.querySelectorAll('[data-filter]').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button));});
    $('#project-count').textContent=`${count} project${count===1?'':'s'}`;
  }));
}
function openCase(){const target=document.getElementById(location.hash.slice(1)||'work');if(target?.classList.contains('case'))target.open=true;}
function renderEvidence(evidence){
  $('#evidence-body').innerHTML=Object.entries(evidence).map(([key,value])=>{
    const v=value.verification;const audit=v.independent_validation;
    const comparisons=v.independent_numeric_comparisons??audit?.numeric_comparisons;
    const independent=key==='voiceai-analytics-lab'?`${comparisons.toLocaleString()} numeric checks<small>+ ${v.commercial_validation.invoice_lines} invoice lines / ${v.commercial_validation.projects} project windows</small>`:`${comparisons.toLocaleString()} numeric checks<small>Recomputed from raw public snapshot</small>`;
    return `<tr><td><a href="${safe(value.repository)}/blob/${safe(value.source_commit)}/docs/VERIFICATION.md">${safe(names[key])} ↗</a><small>${safe(value.data_kind)} · local execution</small><small><a href="${safe(value.remote_ci?.url??value.repository+'/actions')}">Remote CI: ${safe(value.remote_ci?.headSha===value.source_commit?value.remote_ci.conclusion:'inspect workflow')} ↗</a></small></td><td>${v.dbt_models}</td><td>${v.dbt_tests} passed</td><td>${v.pytest_tests} passed</td><td>${independent}</td><td><span class="pass">Verified · exit ${value.clean_install.exit_code}</span></td></tr>`;
  }).join('');
}
function options(select,items){select.replaceChildren(...items.map(([value,label])=>{const option=document.createElement('option');option.value=value;option.textContent=label;return option;}));}
function setDataset(){
  const nyc=$('#dataset-select').value==='nyc';
  $('#slice-label').textContent=nyc?'Agency':'Repository';
  $('#measure-control').hidden=nyc;
  const choices=nyc?['DEP','DOT','DSNY'].map(v=>[v,v]):[['all','All 3 repositories'],...Object.keys(data.github.summary.reduce((all,row)=>(all[row.repository]=true,all),{})).map(v=>[v,v])];
  options($('#slice-select'),choices);draw();
}
function seriesForSelection(){
  const nyc=$('#dataset-select').value==='nyc',slice=$('#slice-select').value;
  if(nyc){
    const rows=data.nyc.backtest.filter(r=>r.agency===slice&&r.split==='holdout');
    const dates=[...new Set(rows.map(r=>r.date))].sort();
    const actual=new Map(rows.map(r=>[r.date,Number(r.actual)]));
    return {dates,series:[{name:'Observed requests',values:dates.map(d=>actual.get(d))},...['weekday_mean','seasonal_naive'].map(model=>({name:model==='weekday_mean'?'Four-week weekday mean':'Seasonal-naive benchmark',values:dates.map(date=>Number(rows.find(r=>r.date===date&&r.model===model).prediction))}))],
      heading:`${slice} · demand under a held-out surge`,context:'June 17–30, 2025 · two rolling 7-day holdout horizons · requests/day',
      limit:'The final 14 days were excluded from model-class selection. Poor accuracy remains visible. These service requests are not calls, and the quarter’s arrival cohort excludes earlier backlog.',
      source:'Source: official NYC 311 frozen extract · real public data · source timestamps are New York local time.'};
  }
  const metric=$('#measure-select').value;
  const labels={nonmerge_commits:'Non-merge commits',observed_human_authors:'Observed linked human authors',opened_issues:'Opened issues',stable_releases:'Stable published releases'};
  const rows=data.github.activity.filter(r=>slice==='all'||r.repository===slice);
  const dates=[...new Set(rows.map(r=>r.month))].sort(),repos=[...new Set(rows.map(r=>r.repository))].sort();
  return {dates,series:repos.map(repo=>({name:repo,values:dates.map(date=>Number(rows.find(r=>r.repository===repo&&r.month===date)[metric]))})),
    heading:`${labels[metric]} · compare maintenance rhythms`,context:'January–December 2025 · complete calendar-month spine · UTC',
    limit:'Public default-branch activity is not commercial usage, paying customers or employee productivity. Linked authors may be missing; explicit bots and merges have distinct treatment. Monthly distinct authors cannot be summed into annual uniques.',
    source:'Source: sanitized, paginated GitHub REST API captures · real public metadata · frozen 2025 observation window.'};
}
function draw(){
  const selection=seriesForSelection();plotted=selection;
  $('#plot-heading').textContent=selection.heading;$('#plot-context').textContent=selection.context;
  $('#plot-limit').textContent=selection.limit;$('#plot-source').textContent=selection.source;
  const width=Math.min(930,Math.max(320,$('#chart').clientWidth-32)),height=width<500?235:300,left=58,right=16,top=15,bottom=43;
  const max=Math.max(1,...selection.series.flatMap(s=>s.values))*1.10;
  const x=i=>left+i*(width-left-right)/Math.max(1,selection.dates.length-1);
  const y=value=>height-bottom-value/max*(height-top-bottom);
  let elements='';
  for(let i=0;i<=4;i++){
    const value=max*i/4,py=y(value);
    elements+=`<line x1="${left}" y1="${py}" x2="${width-right}" y2="${py}" stroke="#e6edeb"/><text x="${left-12}" y="${py+4}" text-anchor="end" fill="#6a7b80" font-size="10">${Math.round(value).toLocaleString()}</text>`;
  }
  selection.dates.forEach((date,i)=>{
    if(i%Math.ceil(selection.dates.length/5)===0||i===selection.dates.length-1){
      const label=$('#dataset-select').value==='nyc'?date.slice(5).replace('-','/'):['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][Number(date.slice(5,7))-1];
      elements+=`<text x="${x(i)}" y="${height-16}" text-anchor="middle" fill="#6a7b80" font-size="10">${safe(label)}</text>`;
    }
  });
  selection.series.forEach((series,index)=>{
    const color=colors[index%colors.length],path=series.values.map((value,i)=>`${i?'L':'M'}${x(i)},${y(value)}`).join(' ');
    elements+=`<path d="${path}" fill="none" stroke="${color}" stroke-width="${index===0?2.8:2}" stroke-linejoin="round" ${index===2?'stroke-dasharray="6 4"':''}/>`;
    series.values.forEach((value,i)=>{elements+=`<circle cx="${x(i)}" cy="${y(value)}" r="3" fill="${color}" tabindex="0"><title>${safe(series.name)} · ${safe(selection.dates[i])}: ${value.toLocaleString(undefined,{maximumFractionDigits:2})}</title></circle>`;});
  });
  $('#chart').innerHTML=`<svg viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="chart-title chart-description"><title id="chart-title">${safe(selection.heading)}</title><desc id="chart-description">${safe(selection.context)}. Exact values are available in the table below.</desc>${elements}</svg>`;
  $('#legend').innerHTML=selection.series.map((series,index)=>`<span><i style="background:${colors[index%colors.length]}"></i>${safe(series.name)}</span>`).join('');
  $('#plot-table').innerHTML=`<table><thead><tr><th>Date</th>${selection.series.map(s=>`<th>${safe(s.name)}</th>`).join('')}</tr></thead><tbody>${selection.dates.map((date,i)=>`<tr><td>${safe(date)}</td>${selection.series.map(s=>`<td>${s.values[i].toLocaleString(undefined,{maximumFractionDigits:2})}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
}
function diagrams(){
  const definitions={voiceai:[['Seeded','synthetic CSV'],['DuckDB','+ dbt models'],['KPIs / cohorts','+ invoices'],['Raw CSV','Decimal audit'],['Dashboard','+ decision brief']],nyc:[['Official','Socrata API'],['Immutable','public snapshot'],['Request-grain','dbt model'],['Censoring','+ backtesting'],['Raw-data audit','+ report']],github:[['GitHub API','paged capture'],['Incremental','keyed upserts'],['Commit / issue','release facts'],['Cohorts','+ concentration'],['JSON audit','+ decision brief']]};
  document.querySelectorAll('[data-diagram]').forEach(container=>{
    const stages=definitions[container.dataset.diagram];
    container.innerHTML=`<svg viewBox="0 0 620 104" role="img" aria-label="Architecture: ${safe(stages.map(s=>s.join(' ')).join(' → '))}"><defs><marker id="arrow-${container.dataset.diagram}" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L6,3 z" fill="#8aa5a2"/></marker></defs>${stages.map((stage,i)=>`<g><rect x="${i*126}" y="10" width="114" height="70" rx="7" fill="${i===4?'#e4f1eb':'#f4f7f6'}" stroke="#d5e2de"/><text x="${i*126+57}" y="38" text-anchor="middle" font-size="10" fill="#294c51">${safe(stage[0])}<tspan x="${i*126+57}" dy="17">${safe(stage[1])}</tspan></text>${i<4?`<line x1="${i*126+114}" y1="45" x2="${i*126+124}" y2="45" stroke="#8aa5a2" marker-end="url(#arrow-${container.dataset.diagram})"/>`:''}</g>`).join('')}</svg>`;
  });
}
function download(){
  if(!plotted)return;
  const quote=v=>'"'+String(v).replaceAll('"','""')+'"';
  const csv=[['Date',...plotted.series.map(s=>s.name)],...plotted.dates.map((d,i)=>[d,...plotted.series.map(s=>s.values[i])])].map(row=>row.map(quote).join(',')).join('\n');
  const url=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'}));
  const link=document.createElement('a');link.href=url;link.download='verified-historical-aggregates.csv';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
projectFilters();diagrams();window.addEventListener('hashchange',openCase);window.addEventListener('resize',()=>{if(data)draw();});openCase();
document.querySelectorAll('[data-case]').forEach(link=>link.addEventListener('click',()=>{document.querySelector(link.hash).open=true;}));
Promise.all(['content/evidence.json','content/nyc.json','content/github.json'].map(loadJSON)).then(([evidence,nyc,github])=>{
  data={evidence,nyc,github};renderEvidence(evidence);setDataset();
  $('#dataset-select').addEventListener('change',setDataset);$('#slice-select').addEventListener('change',draw);$('#measure-select').addEventListener('change',draw);$('#download-data').addEventListener('click',download);
}).catch(()=>{$('#plot-heading').textContent='Aggregate data could not be loaded.';$('#plot-context').textContent='Run ./start.sh to serve the site, or inspect the linked source reports.';$('#evidence-body').innerHTML='<tr><td colspan="6">Execution records unavailable. Inspect the source repositories directly.</td></tr>';});
