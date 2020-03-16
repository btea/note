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
        response.writeHead(200, {
            'Content-Type': 'text/event-stream'
        })
        id = setInterval(() => {
            a++
            response.write('data: {a: 10}' + '\n\n')
            if (a >= 5) {
                clearInterval(id)
                response.end()
            }
        }, 1000)
    }
}).listen(2233)