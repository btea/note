const ws = require('nodejs-websocket');

var server = ws.createServer(function(conn){
    conn.on('text', function(str){
        console.log(str);
        // conn.sendText('已接收到客户端传来消息');
    });
    conn.on("close", function (code, reason) {
        console.log("关闭连接")
    });
    conn.on("error", function (code, reason) {
        console.log("异常关闭")
    });
}).listen(3333);