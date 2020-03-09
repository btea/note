const http = require('http')
const fs = require('fs')

const port = 2233
const serve = http.createServer((request, response) => {
    let url = request.url
    if (url === '/') {
        fs.readFile('./danmaku.html', (err, str) => {
            response.setHeader('Content-Type', 'text/html;charset=utf-8')
            response.end(str)
        })
    } 
    if (url === '/getdanmaku') {
        response.setHeader('Content-Type', 'application/json;charset=utf-8')

    }
    if (url === '/senddanmaku') {
        response.setHeader('Content-Type', 'application/json;charset=utf-8')
        
    }
    if (/\.js$/.test(url)) {
        fs.readFile('.' + url, (err, str) => {
            response.setHeader('Content-type', 'application/x-javascript')
            if (err) {
                console.log(err)
                return
            }
            response.end(str)
        })
    }
})
serve.listen(port)