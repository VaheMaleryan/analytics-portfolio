"""Refresh website's immutable aggregate content from locally verified projects (optional author workflow)."""
import csv,hashlib,json,shutil
from pathlib import Path
ROOT=Path(__file__).resolve().parent
WORKSPACE=ROOT.parent
PROJECTS=['voiceai-analytics-lab','nyc311-operations-intelligence','developer-ecosystem-intelligence']


def csv_rows(path):
    with path.open() as f:return list(csv.DictReader(f))


def refresh():
    publications=json.loads((WORKSPACE/'portfolio-evidence/published-projects.json').read_text())
    remote={r['project']:r for r in publications}
    ci_path=WORKSPACE/'portfolio-evidence/remote-ci.json'
    ci=json.loads(ci_path.read_text()) if ci_path.exists() else {}
    evidence={}
    for name in PROJECTS:
        source=WORKSPACE/name
        proof=json.loads((source/'docs/VERIFICATION.json').read_text());assert proof['status']=='PASS'
        clean=json.loads((WORKSPACE/'portfolio-evidence'/f'{name}-clean.json').read_text());assert clean['exit_code']==0
        assert clean['lock_sha256']==hashlib.sha256((source/'requirements.lock.txt').read_bytes()).hexdigest()
        folder=ROOT/'content'/name;folder.mkdir(parents=True,exist_ok=True)
        for doc in ['REPORT.md','ARCHITECTURE.md','DEMO.md','VERIFICATION.md']:
            if (source/'docs'/doc).exists():shutil.copy2(source/'docs'/doc,folder/doc)
        if name=='voiceai-analytics-lab':shutil.copy2(source/'docs/COMMERCIAL_REPORT.md',folder/'COMMERCIAL_REPORT.md')
        screenshot='business-intelligence.jpg' if name=='voiceai-analytics-lab' else 'dashboard.jpg'
        shutil.copy2(source/'docs'/screenshot,ROOT/'assets'/f'{name}.jpg')
        evidence[name]=dict(verification=proof,clean_install=clean,repository=remote[name]['url'],source_commit=remote[name]['commit'],
            data_kind='SYNTHETIC' if name.startswith('voiceai') else 'REAL PUBLIC DATA',remote_ci=ci.get(name))
    nyc=WORKSPACE/PROJECTS[1];github=WORKSPACE/PROJECTS[2]
    (ROOT/'content/nyc.json').write_text(json.dumps(dict(daily=csv_rows(nyc/'artifacts/daily.csv'),
        backtest=csv_rows(nyc/'artifacts/backtest_predictions.csv'),summary=json.loads((nyc/'artifacts/analysis.json').read_text())['summary']),indent=2)+'\n')
    (ROOT/'content/github.json').write_text(json.dumps(dict(activity=csv_rows(github/'artifacts/mart_activity.csv'),
        summary=json.loads((github/'artifacts/analysis.json').read_text())['overview']),indent=2)+'\n')
    (ROOT/'content/voiceai.json').write_text((WORKSPACE/PROJECTS[0]/'artifacts/commercial.json').read_text())
    (ROOT/'content/evidence.json').write_text(json.dumps(evidence,indent=2)+'\n')
    print('Website evidence refreshed from executed local results and verified published repository identities.')
if __name__=='__main__':refresh()
