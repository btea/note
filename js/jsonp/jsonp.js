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
        let n, str, obj;
        n = url.split('?')[1].split('=')[1];
        obj = {
            data: [1, 2, 3, 4, 5, 6],
            list: {
                name: 'z',
                age: 18
            }
        }
        str = `;${n}(${JSON.stringify(obj)})`;
        response.end(str);
    }
}).listen(2233);