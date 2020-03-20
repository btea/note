const http = require('http')
const fs = require('fs')

http.createServer((request, response) => {
    let url = request.url
    if(url === '/') {
        fs.readFile('./connection.html', (err, text) => {
            if(err){
                console.log(err)
            }else{
                response.end(text);
            }
        })
    }
    if (/^\/connection/.test(url)) {
        let data = []
        console.log(request.headers.cookie)
        request.on('data', (chunk) => {
            data += chunk
        })
        request.on('end', () => {
            console.log(data)
            // response.setHeader('Access-Control-Allow-Origin', 'http://192.168.1.3:2233');
            // response.setHeader('Connection', 'close');
            response.setHeader('Content-Type', 'application/json;charset=utf-8');
            response.setHeader('Set-Cookie', ['bir=4223', 'sessionid=513654656']);
            response.statusCode = 200;
            let obj = {
                code: 200,
                msg: 'ok',
                data: {
                    name: '灵凌林',
                    sign: '说书人叹天下旧事如潮，听书人悲欢不过一壶新茶。'
                }  
            }
            response.end(JSON.stringify(obj));
        })
    }
    // http缓存   https://blog.csdn.net/lncci/article/details/82182788
    if (/\.js$/.test(url)) {
        fs.readFile('.' + url, (err, str) => {
            response.setHeader('Content-type', 'application/x-javascript')
            if (err) {
                console.log(err)
                return
            }
            // 强制缓存
            // max-age  http/1.1
            // expires http/1.0
            // max-age优先级高于expires
            response.setHeader('Cache-Control', 'max-age=3600');

            // 协商缓存  协商缓存需服务端拿到对应的首部字段值进行比较，若符合缓存要求，则返回304，否则返回新的资源，并返回200
            // Etag last-modified                 response
            // If-None-Match If-Modified-Since    request
            // Etag优先级要高  
            response.setHeader('Etag', 'zys1993');
            response.end(str)
        })
    }
}).listen(2233)