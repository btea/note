// http://louiszhai.github.io/2016/11/02/ajax/

const http = require('http');
const fs = require('fs');;


let url;
http.createServer(function(request, response){
    console.log(request.url);
    url = request.url;
    if(url === '/'){
        fs.readFile('./ajax.html', 'utf-8', function(err, data){
            if(err){return;}
            response.end(data);
        })
    }
    if(url === '/favicon.ico'){
        response.end();
    }
    if(/^\/getContent/.test(url)){
        let t = Date.now();
        response.write('23333');
        while(Date.now() - t > 5000){
            response.end();
        }
    }

}).listen(2222);