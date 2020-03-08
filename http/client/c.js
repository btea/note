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
            response.setHeader('Connection', 'close');
            response.setHeader('Content-Type', 'application/json;charset=utf-8');
            response.setHeader('Set-Cookie', 'bir=4223;n="zys"');
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
}).listen(2233)