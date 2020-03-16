const fs = require('fs')
const http = require('http')
let a = 0
http.createServer(function(request, response) {
    let url = request.url
    if(url === '/') {
        fs.readFile('./image.html', (err, data) => {
            if (err) {
                console.log(err)
            } else {
                response.setHeader('Content-Type', 'text/html')
                response.end(data)
            }
        })
    }
    if (url === '/click') {
        a++
        response.end('click')
    }
    if (url === '/favicon') {
        response.end('')
    }
    console.log('点击次数:', a)
}).listen(2233)