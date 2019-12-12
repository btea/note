const request = require('request')
const cheerio = require('cheerio')
const fs = require('fs')
const emoji = require('./emoji.json')
console.log(emoji.fruit[0])
// let httpStream = request({
// 	method: 'GET',
// 	url: 'http://www.menvscode.com/detail/59c927e910c98d0e654c1b65'
// })

// let str = '', emojis = ''
// httpStream.on('data', chunk => {
// 	str += chunk
// 	let $ = cheerio.load(str)
// 	let els = $('.article-main font')
// 	els.map(e => {
// 		emojis += e.innerText
// 	})
// 	fs.writeFile('./index.html', els, 'utf-8', (err) => {
// 		if (err) {
// 			console.log('fail')
// 		} else {
// 			console.log('success')
// 		}
// 	})
// })

const iconv = require('')
iconv.encode(oriText, 'gbk')
