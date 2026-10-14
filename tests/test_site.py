import json,re,unittest
from html.parser import HTMLParser
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
class Links(HTMLParser):
    def __init__(self):super().__init__();self.links=[];self.ids=set();self.scripts=[]
    def handle_starttag(self,tag,attrs):
        attrs=dict(attrs)
        if 'id' in attrs:self.ids.add(attrs['id'])
        if 'href' in attrs:self.links.append(attrs['href'])
        if 'src' in attrs:self.links.append(attrs['src'])
        if tag=='script':self.scripts.append(attrs.get('src',''))

class SiteContracts(unittest.TestCase):
    def test_internal_navigation_downloads_and_assets_exist(self):
        parser=Links();parser.feed((ROOT/'index.html').read_text())
        for link in parser.links:
            if link.startswith(('https:','http:')):continue
            if link.startswith('#'):
                if len(link)>1:self.assertIn(link[1:],parser.ids)
            else:self.assertTrue((ROOT/link.split('#')[0]).is_file(),link)
        self.assertTrue(parser.scripts)
        self.assertTrue(all(not s.startswith(('http','//')) for s in parser.scripts))

    def test_evidence_is_passed_and_reports_actual_separate_test_types(self):
        data=json.loads((ROOT/'content/evidence.json').read_text())
        self.assertEqual(len(data),3)
        for project,e in data.items():
            v=e['verification'];self.assertEqual(v['status'],'PASS');self.assertEqual(e['clean_install']['exit_code'],0)
            self.assertGreater(v['dbt_models'],0);self.assertGreater(v['pytest_tests'],0);self.assertGreater(v['dbt_tests'],0)
            self.assertRegex(e['source_commit'],r'^[0-9a-f]{40}$')
            self.assertEqual(e['repository'],'https://github.com/VaheMaleryan/'+project)
        self.assertEqual(data['voiceai-analytics-lab']['data_kind'],'SYNTHETIC')
        self.assertEqual(data['nyc311-operations-intelligence']['verification']['independent_validation']['rows'],195941)

    def test_interactive_aggregate_values_match_case_study_and_source_evidence(self):
        nyc=json.loads((ROOT/'content/nyc.json').read_text());gh=json.loads((ROOT/'content/github.json').read_text());voice=json.loads((ROOT/'content/voiceai.json').read_text())
        self.assertEqual(int(nyc['summary']['requests']),195941)
        self.assertEqual(int(nyc['summary']['completed'])+int(nyc['summary']['unresolved']),195941)
        peak=next(r for r in nyc['daily'] if r['agency']=='DEP' and r['date_day']=='2025-06-24')
        self.assertEqual(int(peak['arrivals']),3721)
        self.assertEqual(sum(int(r['commits']) for r in gh['activity']),124)
        self.assertEqual(sum(int(r['opened_issues']) for r in gh['activity']),210)
        self.assertEqual(voice['discrepancy_cents'],123)
        self.assertEqual(voice['funnel'][0],{'signed_up':64,'key_created':62,'first_success':59,'deployed':33})
        html=(ROOT/'index.html').read_text()
        for boundary in ['SYNTHETIC DATA ONLY','does not measure product usage','not contact-center','Computer Science student']:
            self.assertTrue(boundary in html,'Required data-boundary disclosure missing: '+boundary)
        self.assertNotRegex((ROOT/'app.js').read_text(),r'gh[pousr]_[A-Za-z0-9]{25,}')
