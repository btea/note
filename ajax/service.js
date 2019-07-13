const http = require('http');
const fs = require('fs');
let time = () => Math.floor(Math.random() * (3 - 1) + 1) * 100;
http.createServer((request, response) => {
    let url = request.url, i = 0;
    if(url === '/'){
        fs.readFile('./client.html','utf-8',function(err, res){
            if(err){
                throw Error('read file fail');
            }
            response.end(res);
        })
    }
    if(url === '/favicon.ico'){
        response.end();
    }
    if(url === '/practice'){
        setTimeout(function(){
            i++;
            response.end(JSON.stringify({num: i}));
        }, time());
    }
}).listen('2233');