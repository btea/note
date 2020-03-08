const http = require('http')

http.createServer(function(request, response){
    let url = request.url;
    response.setHeader('Access-Control-Allow-Origin', 'http://192.168.1.3:2233');
    if (/^\/connection/.test(url)) {
        let data = []
        console.log(request.cookie)
        request.on('data', (chunk) => {
            data += chunk
        })
        request.on('end', () => {
            console.log(data)
            response.setHeader('Connection', 'close');
            response.setHeader('Content-Type', 'application/json;charset=utf-8');
            response.setHeader('Set-Cookie', 'name="admin";id=123456;domain="http://192.168.1.3:2233"');
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
    }else {
        response.setHeader('Connection', 'close');
        response.end('connection');
    }
}).listen(3000);