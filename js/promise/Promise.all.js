const https = require('https');
const qs = require('querystring');

const params = {
    limit: 50,
    desktop: true
};

let content = qs.stringify(params);
let options = {
    hostname: 'www.zhihu.com',
    port: 443,
    path: '/api/v3/feed/topstory/hot-list-web?' + content,
    method: 'GET',
    // method: 'POST',
    // header: {
        // 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    // }
}, one, two;
one = new Promise((resolve, reject) => {
    let req = https.request(options, function(res){
        res.setEncoding('utf8');
        let data = '';
        res.on('data', function(chunk){
            data += chunk;
        });
        res.on('end', function(){
            // response.writeHead(200, { 'Content-Type': 'text/plain; charset=UTF-8' });
            // response.end(data);
            resolve(data)
        })
    })

    req.on('error',function(e){
        console.log('problem with request:' + e.message);
        reject(e);
    })
    req.end();
});
two = new Promise((resolve, reject) => {
    let req = https.request(options, function(res){
        res.setEncoding('utf8');
        let data = '';
        res.on('data', function(chunk){
            data += chunk;
        });
        res.on('end', function(){
            // response.writeHead(200, { 'Content-Type': 'text/plain; charset=UTF-8' });
            // response.end(data);
            resolve(data)
        })
    })

    req.on('error',function(e){
        console.log('problem with request:' + e.message);
        reject(e);
    })
    req.end();
});
// 当且仅当Promise.all([])(传入的可迭代对象为空时为同步)，而若Promise.race传入一个空数组参数时，主race promise永远不会决议，而不是立即决议,此时永远不要传递空数组。
Promise.all([one, two])
.then(function(one){
    // 返回的是两者结果的合并,完成消息组成的数组
    console.log('one',one);
})
