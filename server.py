# -*- coding: utf-8 -*-
import http.server
from http.server import HTTPServer, BaseHTTPRequestHandler
import socketserver
import json
PORT = 8000
class MyHandler(http.server.SimpleHTTPRequestHandler):
    extensions_map={
        '.mpd': 'application/dash+xml',
        '.manifest': 'text/cache-manifest',
        '.html': 'text/html',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.svg': 'image/svg+xml',
        '.css': 'text/css',
        '.js': 'application/x-javascript',
        '': 'application/octet-stream', # Default
    }
    def do_POST(self):
        if self.path == "/api/license":
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            response = {
                "keys": [
                    {
                        "kty": "raw",
                        "k": "76a6c65c5ea762046bd749a2e632ccbb",
                        "kid": "a7e61c373e219033c21091fa607bf3b7"
                    }
                ],
                "type": "temporary"
            }
            self.wfile.write(json.dumps(response).encode())
        else:
            self.send_error(404, "Endpoint not found")
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'X-Requested-With')
        http.server.SimpleHTTPRequestHandler.end_headers(self)
httpd = socketserver.TCPServer(("", PORT), MyHandler)
print("serving at port", PORT)
httpd.serve_forever()