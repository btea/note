const fs = require('fs');
const https = require('https');
const http = require('http');
// https://www.printf520.com:8080/GetTypeInfo?id=2

http.createServer(function(request, response){
    let url;
    url = request.url;
    if(url === '/'){
        fs.readFile('./hot.html', (err, data) => {
            if(err){
                throw Error(err);
            }
            response.end(data);
        })
    }
    if(/^\/news/.test(url)){
        let id = url.split('=')[1];
        let options = {
            hostname: 'www.printf520.com',
            port: 8080,
            path: '/GetTypeInfo?id=' + id,
            method: 'GET',
        };
        let req = https.request(options, function(res){
            res.setEncoding('utf8');
            let data = '';
            res.on('data', function(chunk){
                data += chunk;
            });
            res.on('end', function(){
                response.writeHead(200, { 'Content-Type': 'text/plain; charset=UTF-8' });
                response.end(data);
            })
        })
        
        req.on('error',function(e){
            console.log('problem with request:' + e.message);
            let obj = {msg: e.message};
            response.end(JSON.stringify(obj));
        })
        req.end();
    }
    if(/^\/favicon/.test(url)){
        response.end('');
    }
}).listen(2333);