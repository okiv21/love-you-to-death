"""Local-only preview with dependency-free automatic refresh."""
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
ROOT = Path(__file__).resolve().parent / 'dist'
class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)
    def do_GET(self):
        if self.path == '/__version':
            data = str(max(p.stat().st_mtime_ns for p in ROOT.iterdir() if p.is_file())).encode()
            self.send_response(200); self.send_header('Cache-Control', 'no-store'); self.end_headers(); self.wfile.write(data)
        elif self.path in ('/', '/index.html'):
            data = (ROOT / 'index.html').read_bytes() + b"<script>let v;setInterval(async()=>{try{let n=await(await fetch('/__version')).text();if(v&&n!==v)location.reload();v=n}catch{}},1000)</script>"
            self.send_response(200); self.send_header('Content-Type', 'text/html; charset=utf-8'); self.send_header('Cache-Control','no-store'); self.end_headers(); self.wfile.write(data)
        else:
            super().do_GET()
if __name__ == '__main__':
    server = ThreadingHTTPServer(('127.0.0.1', 4173), Handler)
    print('Live preview: http://localhost:4173', flush=True)
    server.serve_forever()
