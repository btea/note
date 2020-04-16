const readline = require('readline');
let init = 0;
let str;
let timer = setInterval(function(){
    str = ' '.repeat(Math.floor(init / 10));
    //删除光标所在行
    readline.clearLine(process.stdout, 0);
    // //移动光标到行首
    readline.cursorTo(process.stdout, 1,1);
    
    process.stdout.write('\x1b[46;34m' + str + init + '%' + str + '\x1b[0m');
    init++;
    if(init > 100){
        clearTimeout(timer);
    }
},100);
