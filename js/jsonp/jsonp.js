const http = require('http');
const fs = require('fs');

http.createServer((request, response) => {
    let url = request.url;
    if(url === '/'){
        fs.readFile('./index.html', (err, str) => {
            response.end(str);
        })
    }
    if(~url.indexOf('getData')){
        let n, str;
        n = url.split('?')[1].split('=')[1];
        str = `;${n}({data: [1,2,3,4,5,6]})`;
        response.end(str);
    }
}).listen(2233);