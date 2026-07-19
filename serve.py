from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
import os
ROOT=Path(__file__).resolve().parent
os.chdir(ROOT)
class Handler(SimpleHTTPRequestHandler):
    def do_GET(self):
        clean=self.path.split('?',1)[0].split('#',1)[0]
        rel=clean.lstrip('/')
        candidate=ROOT/rel
        if clean == '/':
            self.path='/index.html'
        elif not Path(rel).suffix and (candidate/'index.html').exists():
            self.path='/' + rel.rstrip('/') + '/index.html'
        return super().do_GET()
ThreadingHTTPServer(('localhost',8080),Handler).serve_forever()
