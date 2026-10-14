import json,platform,unittest
from datetime import datetime,timezone
from pathlib import Path
ROOT=Path(__file__).resolve().parent
suite=unittest.defaultTestLoader.discover(str(ROOT/'tests'))
result=unittest.TextTestRunner(verbosity=2).run(suite)
if not result.wasSuccessful():raise SystemExit(1)
record=dict(status='PASS',recorded_at=datetime.now(timezone.utc).isoformat(),python=platform.python_version(),automated_tests=result.testsRun,failures=len(result.failures),errors=len(result.errors),dependencies='Python 3.12 standard library; native browser APIs')
(ROOT/'docs/VERIFICATION.json').write_text(json.dumps(record,indent=2)+'\n')
print(json.dumps(record))
