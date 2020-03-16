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
        response.write('this is a word', 'utf-8')
        id = setInterval(() => {
            a++
            response.write('{a: 10}', 'utf-8')
            if (a >= 5) {
                clearInterval(id)
                response.end()
            }
        }, 1000)
    }
}).listen(2233)