const fs = require('fs')
const http = require('http')
let a = 0
http.createServer(function(request, response) {
    let url = request.url
    if(url === '/') {
        fs.readFile('./comet.html', (err, data) => {
            if (err) {
                console.log(err)
            } else {
                response.setHeader('Content-Type', 'text/html')
                response.end(data)
            }
        })
    }
    if (url === '/favicon.ico') {
        response.end('')
    }
    if (url === '/get') {
        getV()
    }
    function getV() {
        let id
        response.setHeader('Content-Type', 'text/html;charset=utf-8');
        response.setHeader('Transfer-Encoding', 'chunked');
        // id = setInterval(() => {
        //     a++
        //     response.write('data: {a: ' + a + '}')
        //     if (a >= 5) {
        //         clearInterval(id)
        //         response.end()
        //     }
        // }, 1000)
        setTimeout(() => {
            response.write("第一次传输<br/>");
        }, 1000);
        setTimeout(() => {
            response.write("第二次传输");
            response.end()
        }, 2000);
    }
}).listen(2233)