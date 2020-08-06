// Base64索引表，字符选用"A-Z、a-z、0-9、+、/"64个可打印字符，这是标准的base64协议规定。在日常使用中我们还会看到"="或"=="号
// 出现在Base64的编码结果中，"="是作为填充字符出现。

// 具体步骤：
// 第一步：将待转换的字符串每三个字节分为一组，每个字节占8bit，那么总共有24个二进制位。  
// 第二步：将上面的24个二进制位每6个分为一组，总共分为4组。
// 第三步：在每组前面添加两个0，每组由6个变为8个二进制位，总共有32个进制位，即四个字节。  
// 第四步：根据Base64编码对照表获取对应的值。  
// 0-25(A-Z) 26-51(a-z)  52-61(0-9)  62(+)  63(/)

/**
 * 字符串转二进制
*/
function charToBinary(str) {
    var code = ''
    for(let i of str) {
        let number = i.charCodeAt(0).toString(2)
        for (let a = 0; a < 8 - number.length; a++) {
            number = '0' + number
        }
        code += number
    }
    return code
}
/**
 * 二进制转base64
*/
function binaryToBase64(list) {
    var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    var val = '' 
    
    if (list % 24 === 8) {
        list += '0000';
        val += '=='
    }
    if (list % 24 === 16) {
        list += '00';
        val += '='
    }
    let encode = ''
    for(let i = 0; i < list.length; i+=6) {
        let item = list.slice(i, i + 6)
        encode += str[parseInt(item, 2)]
    }
    return encode
}

/**
 * 字符串转base64
*/

function base64encode(text) {
    let base64Code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    let res = '';
    let i = 0;
    while (i < text.length) {
        let char1, char2, char3, enc1, enc2, enc3, enc4;
        
        // 三个字符一组，转二进制
        char1 = text.charCodeAt(i++); 
        char2 = text.charCodeAt(i++);
        char3 = text.charCodeAt(i++);
    
        enc1 = char1 >> 2; // 取第 1 字节的前 6 位
        
        // 三个一组处理
        if (isNaN(char2)) {
            // 只有 1 字节的时候
            enc2 = ((char1 & 3) << 4) | (0 >> 4);
            // 第65个字符用来代替补位的 = 号
            enc3 = enc4 = 64;
        } else if (isNaN(char3)) {
            // 只有 2 字节的时候
            enc2 = ((char1 & 3) << 4) | (char2 >> 4);
            enc3 = ((char2 & 15) << 2) | (0 >> 6);
            enc4 = 64;
        } else {
            enc2 = ((char1 & 3) << 4) | (char2 >> 4); // 取第 1 个字节的后 2 位(3 = 11 << 4 = 110000) + 第 2 个字节的前 4 位
            enc3 = ((char2 & 15) << 2) | (char3 >> 6); // 取第 2 个字节的后 4 位 (15 = 1111 << 2 = 111100) + 第 3 个字节的前 2 位
            enc4 = char3 & 63; // 取最后一个字节的最后 6 位 (63 = 111111)
        }
        
        // 转base64
        res += base64Code.charAt(enc1) + base64Code.charAt(enc2) + base64Code.charAt(enc3) + base64Code.charAt(enc4)
    }  
    return res;
}

// charToBinary('Man');
// charToBinary('BC');
charToBinary('A');