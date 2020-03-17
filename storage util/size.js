/*同步读取*/
var fs = require('fs');
var data;
try{
    data = fs.readFileSync('file.txt','utf-8');
    // data = fs.readFileSync('../vue.png','binary');
    // data = fs.readFileSync('file.xls','binary');
    // console.log('文件内容：', data);
    console.log('总字节数', sum(data));
    // write(data);
}catch(err){
    console.log('读取文件出错：',err.message);
}

function sum(str){
    // console.log(new Buffer(str));
    var count = 0;
    for(var i = 0; i < str.length; i++){
        var code = str.charCodeAt(i);
        if(code <= 0x007f){  // 127
            count += 1;
        }else if(code <= 0x07ff){ // 2047
            count += 2;
        }else if(code <= 0xffff){ // 65535
            count += 3;
        }else{
            count += 4;
        }
    };
    console.log(size(count));
    return count;
    // return size(count);
}


function size(bit){
    let suffix = ['KB','MB','GB'],s;
    if(bit < 1024){
        s = bit + 'B';
    }else if(bit >= 1024 && bit < 1024 * 1024){
        s = suffix[0];
        s = Math.floor(bit / 1024) + s;
    }else if(bit >= 1024 * 1024 && bit < 1024 * 1024 * 1024){
        s = suffix[1];
        s = Math.floor(bit / 1024 / 1024) + s;
    }
    return s;
}