const http = require('http')

http.createServer(function(request, response){
    let url = request.url;
    response.setHeader('Access-Control-Allow-Origin', 'http://192.168.1.3:2233');
    if (/^\/connection/.test(url)) {
        let data = []
        request.on('data', (chunk) => {
            data += chunk
        })
        request.on('end', () => {
            console.log(data)
            response.setHeader('Connection', 'close');
            response.statusCode = 201;
            response.end('connection');
        })
    }else {
        response.setHeader('Connection', 'close');
        response.end('connection');
    }
}).listen(3000);