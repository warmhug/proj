from http.server import BaseHTTPRequestHandler, HTTPServer
import time
class H(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-Type','text/event-stream')
        self.end_headers()
        for i in range(3):
            self.wfile.write(f\"data: {{\\\"msg\\\": \\\"{i}\\\"}}\\n\\n\".encode())
            self.wfile.flush()
            time.sleep(0.5)
HTTPServer(('0.0.0.0', 25521), H).serve_forever()
