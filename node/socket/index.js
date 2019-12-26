const http = require('http');
const fs = require('fs');
const webSocketServer = require('ws').Server;

http.createServer(function(request, response) {
    fs.readFile('./index.html','utf-8', function(err, data){
        if(err){return;}
        response.write(data);
        response.end();
    })
}).listen(3333);

let wsServer = new webSocketServer({port: 2333});
wsServer.on('connection', function(socket){
    // socket.onmessage = function(event){

	// }
	let i = 0
	setInterval(() => {
		socket.send('来自服务端消息：' + i++)
	}, 5000)
    socket.on('message', function(message){
        console.log('接受到的消息:', message);
        // socket.send('来自服务端的消息:' + message);
    })
})