const http = require('http');
const fs = require('fs');

http.createServer((request, response) => {
    let url = request.url;
    if(url === '/'){
        response.setHeader('Content-type','text/html;charset=utf-8');
        let read = fs.createReadStream('./index.html');
        read.pipe(response);
    }
    if(/js$/.test(url)){
        if(/^\//.test(url)){
            url = '.' + url;
        }
        console.log(url);
        response.setHeader('Content-type','text/javascript;charset=utf-8');
        let read = fs.createReadStream(url);
        read.pipe(response);
    }
    if(/vue$/.test(url)){
        if(/^\//.test(url)){
            url = '.' + url;
        }
        console.log(url);
        response.setHeader('Content-type','text/html;charset=utf-8');
        let read = fs.createReadStream(url);
        read.pipe(response);
    }
}).listen(2333);