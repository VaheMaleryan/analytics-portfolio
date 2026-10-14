from http.server import SimpleHTTPRequestHandler,ThreadingHTTPServer
from pathlib import Path
from urllib.parse import unquote,urlsplit
import os
ROOT=Path(__file__).resolve().parent
class Handler(SimpleHTTPRequestHandler):
    def __init__(self,*args,**kwargs):super().__init__(*args,directory=str(ROOT),**kwargs)
    def do_GET(self):
        parts=Path(unquote(urlsplit(self.path).path)).parts
        if any(p.startswith('.') or p=='artifacts' for p in parts if p not in ('/','')):self.send_error(404);return
        super().do_GET()
    def end_headers(self):
        self.send_header('X-Content-Type-Options','nosniff');self.send_header('Cache-Control','no-cache');super().end_headers()
if __name__=='__main__':
    port=int(os.environ.get('PORTFOLIO_PORT','8504'));print(f'Portfolio: http://127.0.0.1:{port}',flush=True)
    ThreadingHTTPServer(('127.0.0.1',port),Handler).serve_forever()
