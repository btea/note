const http = require('http');
const https = require('https');

const user = 'btea'
let options = {
    hostname: 'www.profile-summary-for-github.com',
    port: 443,
    path: `/api/user/${user}`,
    method: 'get',
    headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36"
    }
}


https.request(options, function(res){
    let req = https.request(options, function(res){
        res.setEncoding('utf8');
        let data = '';
        res.on('data', function(chunk){
            data += chunk;
        });
        res.on('end', function(){
            // response.writeHead(200, { 'Content-Type': 'text/plain; charset=UTF-8' });
            // response.end(data);
            console.log(data);
        })
    })
    
    req.on('error',function(e){
        console.log('problem with request:' + e.message);
    })
    req.end();
})