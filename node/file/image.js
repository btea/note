const fs = require('fs')
let path = './img/skin.png'
fs.readFile(path, (err, data) => {
	if (err) {
		throw Error(err)
	}
	let base64str = new Buffer(data).toString('base64')
	let src = './img/' + Date.now() + '.png';
	fs.writeFile(src, base64str, err => {
		if (err) {
			console.log('fail ' + err)
		} else {
			console.log('success');
		}
	})
})