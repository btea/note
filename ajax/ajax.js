// http://louiszhai.github.io/2016/11/02/ajax/

const http = require('http');
const fs = require('fs');;


let url;
http.createServer(function(request, response){
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
        let str = '';
        request.on('data', function(chunk){
            str += chunk;
        });
        request.on('end', function(){
            console.log(str);
        })
        
        let t = Date.now();
        const timer = 5000;
        response.write('23333');
        setTimeout(function(){
            response.end();
        }, timer)
    }
    if(/^\/stream/.test(url)){
        const readStream = fs.createReadStream('./bg6.jpg');
        fs.stat('./bg6.jpg', function(err, stat){
            if(err){
                throw Error(err);
            }
            response.writeHead(200, {'Content-Type': 'iamge/jpg', 'Content-Length': stat.size});
            readStream.pipe(response);
        })
    }

}).listen(2233);