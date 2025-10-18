#!/usr/bin/env python3
"""
Simple HTTP server to serve the site navigator and static sites
Usage: python3 server.py [port]
Default port: 8000
"""

import http.server
import socketserver
import os
import sys
from pathlib import Path

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=os.getcwd(), **kwargs)

    def end_headers(self):
        # Add custom headers for better serving
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

    def log_message(self, format, *args):
        # Custom logging format
        print(f"[{self.log_date_time_string()}] {format % args}")

    def do_GET(self):
        # Split path and remove trailing slash for directories (except root)
        path = self.path
        if path != '/' and path.endswith('/'):
            path = path[:-1]

        # Construct the full filesystem path
        full_path = os.path.join(os.getcwd(), path.lstrip('/'))

        # Check if it's a directory
        if os.path.isdir(full_path):
            # Look for index.html in the directory
            index_path = os.path.join(full_path, 'index.html')
            if os.path.isfile(index_path):
                # Serve the index.html file
                self.path = path + '/index.html'
            else:
                # No index.html found, try to list directory (default behavior)
                pass

        # Call the parent's do_GET method
        super().do_GET()

def main():
    # Get port from command line or use default
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8000

    # Change to the script's directory
    os.chdir(Path(__file__).parent)

    print(f"🚀 Starting Site Navigator Server")
    print(f"📁 Serving directory: {os.getcwd()}")
    print(f"🌐 Server running at: http://localhost:{port}")
    print(f"📱 Available sites:")
    print(f"   • Root: http://localhost:{port}/ (Site Navigator)")
    print(f"   • Site I: http://localhost:{port}/glm1/")
    print(f"   • Site II: http://localhost:{port}/glm2/")
    print(f"\n💡 Press Ctrl+C to stop the server")
    print("=" * 50)

    try:
        with socketserver.TCPServer(("", port), CustomHTTPRequestHandler) as httpd:
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n\n👋 Server stopped by user")
    except OSError as e:
        if e.errno == 48:  # Address already in use
            print(f"\n❌ Port {port} is already in use. Try a different port:")
            print(f"   python3 server.py {port + 1}")
        else:
            print(f"\n❌ Error starting server: {e}")

if __name__ == "__main__":
    main()