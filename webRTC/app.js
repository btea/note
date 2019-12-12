// https://www.kancloud.cn/kancloud/javascript-standards-reference/46549

const http = require('http');
const fs = require('fs');


http.createServer(function(request, response){
    let url = request.url;
    if(url === '/'){
        fs.readFile('./index.html','utf8',function(err, res){
            if(err){
                throw new Error(err);
            }
            response.writeHead(200, 'ok', {
                'Content-Type': 'text/html;charset=utf-8'
            });
            response.end(res);
        })
    }
    if(url === '/favicon'){
        response.end();
    }
    if(url === '/stream'){
        let data;
        let write = fs.createWriteStream('./a.mp4');
        request.on('data', function(chunk){
            fs.writeFile('./a.mp4', data, function(err, res){
                if(err){
                    console.log(err);
                }else{
                    console.log('s');
                }
            })
            // chunk.pipe(write);
        })
    }
}).listen(2233);