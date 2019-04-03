const fs = require('fs');
const http = require('http');

http.createServer((req, res) => {
    fs.readFile('./index.html', 'utf-8', (err, data) => {
        if(err){throw Error('read file is fail.')}
        res.write(data);
        res.end();
    })
}).listen(2222);