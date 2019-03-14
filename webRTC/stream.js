const http = require('http');
const fs = require('fs');

http.createServer(function(request, response){
    fs.readFile('./stream.html', 'utf-8',function(err, data){
        response.write(data);
        response.end();
    })
}).listen(3000);