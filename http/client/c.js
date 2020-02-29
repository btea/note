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
}).listen(2233)