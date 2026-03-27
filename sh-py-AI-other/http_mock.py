import json
# import http.client
# conn = http.client.HTTPConnection(VLLM_HOST, VLLM_PORT)

class MockHTTPResponse:
    """mock http.client.HTTPResponse """
    def __init__(self, status, body, headers):
        self.status = status
        self.body = body.encode('utf-8') if isinstance(body, str) else body
        self.headers = headers

    def read(self):
        return self.body

    def getheaders(self):
        return list(self.headers.items())

class MockHTTPConnection:
    def __init__(self, host, port):
        self.host = host
        self.port = port
        self.response = None
        print(f"--- MockHTTPConnection initialized for {host}:{port} ---")

    def request(self, method, url, body, headers):
        print(f"--- Mocking request to {method} {url} ---")
        mock_response_data = {
            "message": "This is a mock response from the local debugger.",
            "request_received": {
                "method": method,
                "url": url,
                "headers": dict(headers),
                "body": body.decode('utf-8', errors='ignore') if body else None,
            }
        }
        response_body_str = json.dumps(mock_response_data, indent=2)
        response_headers = {
            "Content-Type": "application/json",
            "Content-Length": str(len(response_body_str)),
            "X-Mock-Server": "true",
        }
        self.response = MockHTTPResponse(200, response_body_str, response_headers)

    def getresponse(self):
        return self.response

    def close(self):
        pass


# conn = MockHTTPConnection(VLLM_HOST, VLLM_PORT)
