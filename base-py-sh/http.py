from http.server import BaseHTTPRequestHandler, HTTPServer

class ReadyHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == "/api/health/ready":
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(b'{"status": "ok"}')
        else:
            self.send_response(404)
            self.end_headers()
    def log_message(self, format, *args):
        # 覆盖默认日志，不输出任何内容
        return

if __name__ == "__main__":
    server = HTTPServer(("0.0.0.0", 8000), ReadyHandler)
    print("Serving on http://0.0.0.0:8000")
    server.serve_forever()

# 测试
# curl http://localhost:8000/api/health/ready
