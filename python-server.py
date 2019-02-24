#!/usr/bin/env python
# Reflects the requests from HTTP methods GET, POST, PUT, and DELETE
# Written by Nathan Hamiel (2010)

from http.server import HTTPServer, BaseHTTPRequestHandler
from optparse import OptionParser
import json

messages = []

class RequestHandler(BaseHTTPRequestHandler):
    
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        BaseHTTPRequestHandler.end_headers(self)


    def do_GET(self):
        
        request_path = self.path
        
        print("\n----- Request hello Start ----->\n")
        print(request_path)
        print(self.headers)
        print("<----- Request End -----\n")
        
        self.send_response(200, "hello")
        
        
        
        self.end_headers()
        
        self.wfile.write(json.dumps(messages).encode())
        
        
        
    def do_POST(self):
        global messages
        request_path = self.path
        
        print("\n----- Request Start ----->\n")
        print(request_path)
        
        request_headers = self.headers
        #response.__setitem__("Access-Control-Allow-Origin", "*")
        #content_length = request_headers.getheaders('content-length')
        #length = int(content_length[0]) if content_length else 0
        
        #print(request_headers)
        
        
        #payload = (self.rfile.read(1000)) #Recently commented out. If message is  less than 986 (1000-14) characters, 'pending' is caused
        payload = (self.rfile.read(154)) #Messages cannot exceed 140 characters
        
        
        print("Got here") #Checks whether the code has run to this point
        
        #self.send_header("Access-Control-Allow-Origin", "*")

        print(payload)
        data = json.loads(payload)["message"]
        
        
        print("<----- Request End -----\n")
        
        
        messages.append(data)
        
        
        allmessages = json.dumps(messages)
        
        
        self.send_response(200)
        
        self.end_headers()
        
        #self.wfile.write(json.dumps(allmessages.encode()))
    
    
    #do_PUT = do_POST
    #do_DELETE = do_GET
        
def main():
    # port = 8080 #original port
    port = 8000 #new port
    print('Listening on localhost hello:%s' % port)
    server = HTTPServer(('', port), RequestHandler)
    server.serve_forever()
    

        
if __name__ == "__main__":
    parser = OptionParser()
    parser.usage = ("Creates an http-server that will echo out any GET or POST parameters\n"
                    "Run:\n\n"
                    "   reflect")
    (options, args) = parser.parse_args()
    
    main()