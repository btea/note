// https://www.kancloud.cn/kancloud/javascript-standards-reference/46549

const http = require('http');
const fs = require('fs');


http.createServer(function(request, response){
    fs.readFile('./index.html','utf8',function(err, res){
        if(err){
            throw new Error(err);
        }
        response.writeHead(200, 'ok', {
            'Content-Type': 'text/html;charset=utf-8'
        });
        response.end(res);
    })
}).listen(2222);