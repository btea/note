// http://louiszhai.github.io/2016/11/02/ajax/

const http = require('http');
const fs = require('fs');;


let url;
http.createServer(function(request, response){
    url = request.url;
    if(url === '/'){
        fs.readFile('./generator.html', 'utf-8', function(err, data){
            if(err){return;}
            response.end(data);
        })
    }
    if(url === '/favicon.ico'){
        response.end();
    }
    if(/^\/getContent/.test(url)){
        response.writeHead(200, {'Content-Type': 'text/plain; charset=UTF-8'});
        response.write('23333');
        response.end('dhaolhfioahsfhaphpsafhap');
    }

}).listen(2222);