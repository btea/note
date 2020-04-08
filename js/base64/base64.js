// Base64索引表，字符选用"A-Z、a-z、0-9、+、/"64个可打印字符，这是标准的base64协议规定。在日常使用中我们还会看到"="或"=="号
// 出现在Base64的编码结果中，"="是作为填充字符出现。

// 具体步骤：
// 第一步：将待转换的字符串每三个字节分为一组，每个字节站8bit，那么总共有24个二进制位。  
// 第二步：将上面的24个二进制位每6个分为一组，总共分为4组。
// 第三步：在每组前面添加两个0，每组由6个变为8个二进制位，总共有32个进制位，即四个字节。  
// 第四步：根据Base64编码对照表获取对应的值。  
// 0-25(A-Z) 26-51(a-z)  52-61(0-9)  62(+)  63(/)
function binaryToStr(list) {
    var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    var val = '' 
    for(var i = 0; i < list.length; i += 3) {
        var code = ''
        code += codeToBinary(list[i]);
        if (list[i + 1]) {
            code += codeToBinary(list[i + 1]);
        }
        if (list[i + 2]) {
            code += codeToBinary(list[i + 2]);
        }
        if (code.length % 6) {
            code += '0'.repeat(6 - (code.length % 6));
        }

        let arr = [code.slice(0,6), code.slice(6, 12)];
        if (code.length / 6 === 3) {
            arr.push(code.slice(12, 18))
        }
        if (code.length / 6 === 4) {
            arr.push(code.slice(18))
        }
        arr.map(v => {
            val += str[parseInt('00' + v, 2)]
        })
        if (code.length / 6 === 2) {
            val += '=='
        }if (code.length / 6 === 3) {
            val += '='
        }
    }
    val = 'data:image/jpeg;base64,' + val; 
    return val
}

function charToBinary(text) {
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    let val = ''
    for(let i = 0; i < text.length; i += 3) {
        let code = ''
        code += codeToBinary(text[i].charCodeAt());
        if (text[i + 1] !== undefined) {
            code += codeToBinary(text[i + 1].charCodeAt());
        }
        if (text[i + 2] !== undefined) {
            code += codeToBinary(text[i + 2].charCodeAt());
        }
        if (code.length % 6) {
            code += '0'.repeat(6 - (code.length % 6));
        }
        let arr = [code.slice(0,6), code.slice(6, 12)];
        if (code.length / 6 === 3) {
            arr.push(code.slice(12, 18))
        }
        if (code.length / 6 === 4) {
            arr.push(code.slice(18))
        }
        arr.map(v => {
            val += str[parseInt('00' + v, 2)]
        })
        if (code.length / 6 === 2) {
            val += '=='
        }if (code.length / 6 === 3) {
            val += '='
        }
    }
    val = 'data:iamge/png;base64,' + val; 
    return val
}
function codeToBinary(code) {
    // 将unicode码转换成二进制
    let v = code.toString(2);
    v = '0'.repeat(8 - v.length) + v;
    return v;
}
// charToBinary('Man');
// charToBinary('BC');
charToBinary('A');