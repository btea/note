const http = require('http');
const fs = require('fs');

http.createServer(function(request, response){
    fs.readFile('./stream.html', function(data){
        request.setEncoding('utf-8');
        console.log(data);
        response.write(data);
        response.end();
    })
}).listen(3000);