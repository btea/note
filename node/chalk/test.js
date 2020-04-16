console.log('\033[34m hello\033[0m');
console.log(456)
console.log('\033[34;1m hello\033[0m');
console.log('\033[34m hello\033[0m');
// console.log('\033[2J');

// let isShow = true;
// let vals = ['\033[5m 23333'];
// console.log(vals[0])

function show() {
	console.log('\033[34m hello\033[0m');
	console.log(456)
	console.log('\033[34;1m hello\033[0m');
	console.log('\033[34m hello\033[0m');
}
let i = 0;
let v = setInterval(() => {
	i++
	show();
	if (i > 10) {
		clearInterval(v);

	}
	console.log('\033[K');
}, 1000);
