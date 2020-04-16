// var colors = require('colors');
// https://blog.csdn.net/autumn84/article/details/44816947
// https://www.colabug.com/141260.html
// https://en.wikipedia.org/wiki/ANSI_escape_code#Colors_and_Styles
/**
 * code 30-37 为字体颜色，91-97为字体颜色的明亮版，40-47为背景色，100-107为背景色的明亮版。terminal的默认字体颜色code是39，默认背景色是49
 * 
 * ---------------------------------------------------
 * |    style    |  code  |    style off    |  code  |
 * |    bold     |   1    |     bold off    |   21   |
 * |     dim     |   2    |     dim off     |   22   |
 * |    italic   |   3    |    italic off   |   23   |
 * |  underline  |   4    |  underline off  |   24   |
 * |   inverse   |   7    |   inverse off   |   27   |
 * |    hidden   |   8    |    hidden off   |   28   |
 * |strikethrough|   9    |strikethrough off|   29   |
 * ---------------------------------------------------
 * 
 * 
 * -----------------------------------------------------------------------------------------
 * |Foreground Code|   30   |   31   |   32   |   33   |   34   |   35   |   36   |   37   |
 * |Background Code|   40   |   41   |   42   |   43   |   44   |   45   |   46   |   47   |
 * |    Normal     |  Black |   Red  | Green  | Yellow |  Blue  |Magenta |  Cyan  |  White | 
 * |    Normal     |  Black |   Red  | Green  | Yellow |  Blue  |Magenta |  Cyan  |  White | 
 * -----------------------------------------------------------------------------------------
*/
var str = `
-----------------------------------------------------------------------------------------
|Foreground Code|   30   |   31   |   32   |   33   |   34   |   35   |   36   |   37   |
|Background Code|   40   |   41   |   42   |   43   |   44   |   45   |   46   |   47   |
|    Normal     |  Black |   Red  | Green  | Yellow |  Blue  |Magenta |  Cyan  |  White | 
|    Normal     |  Black |   Red  | Green  | Yellow |  Blue  |Magenta |  Cyan  |  White | 
-----------------------------------------------------------------------------------------`;
const symbol = require('./symbol');
// const background = require('./background');
const vals = {
	black: '30',
	bgBlack: '40',
	red: '31',
	bgRed: '41',
	green: '32',
	bgGreen: '42',
	yellow: '33',
	bgYellow: '43',
	blue: '34',
	bgBlue: '44',
	magenta: '35',
	bgMagenta: '45',
	cyan: '36',
	bgCyan: '46',
	white: '37',
	bgWhite: '47'
};
const methods = {};
Object.keys(vals).map(key => {
	methods[key] = str => {
		return '\x1b[' + vals[key] + 'm' + str + '\x1b[0m';
	}
	String.prototype[key] = function(){
		return '\x1b[' + vals[key] + 'm' + this.toString() + '\x1b[0m';
	}
})

console.log(`this is a ${methods.green(symbol.heart)}`);
console.log(`this is a ${methods.red(symbol.heart)}`);
console.log(`this is a ${methods.yellow(symbol.heart)}`);
console.log(`this is a ${methods.blue(symbol.heart)}`);
console.log(`this is a ${methods.magenta(symbol.heart)}`);
console.log(`this is a ${methods.cyan(symbol.heart)}`);
let s = `this is a ${methods.yellow(symbol.heart)}`;
console.log(s.bgCyan());
