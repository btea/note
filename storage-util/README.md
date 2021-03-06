### 位，字节  
#### 位："位(bit)"是电子计算机中最小的数据单位。每一位的状态只能是0或1。  
#### 字："字"由若干个字节构成，字的位数叫做字长，不同档次的机器有不同的字长。例如一台8位机，它的1个字就等于1个字节，字长为8位。
#### KB: 是1024个字节
#### MB: 是1024个KB
#### GB: 是1024个MB
#### TB: 是1024个GB

### 常用转换单位
#### 1、位与自己转换
1bit (比特或位)等于 0.125B(byte字节)
1B (byte字节)等于 8bit(比特或位)
#### 2、兆字节与千字节
1KB (kilobyte千字节)等于 0.0009765625MB(兆字节)
1MB (兆字节)等于 1024KB(kilobyte千字节)
#### 3、兆字节与吉字节
1MB (兆字节)等于 0.0009765625GB(吉字节)
1GB (吉字节)等于 1024MB(兆字节)

## 字符编码数值对应的存储长度：  
UCS-2编码(16进制) |  UTF-8 字节流(二进制)  
-----------------|------------------------  
0000 - 007F    |  0xxxxxxx (1字节)                 
0080 - 07FF    |  110xxxxx 10xxxxxx (2字节)         
0800 - FFFF    |  1110xxxx 10xxxxxx 10xxxxxx (3字节)  

### 占用3个字节的范围
U+2E80 - U+2EF3: 0xE2 0xBA 0x80 - 0xE2 0xBB 0xB3 共115个  
U+2F00 - U+2FD5: 0xE2 0xBC 0x80 - 0xE2 0xBF 0x95 共213个  
U+3005 - U+3029: 0xE3 0x80 0x85 - 0xE3 0x80 0xA9 共36个  
U+3038 - U+4DB5: 0xE3 0x80 0xB8 - 0xE4 0xB6 0xB5 共7549个  
U+4E00 - U+FA6A: 0xE4 0xB8 0x80 - 0xEF 0xA9 0xAA 共44138个  
U+FA70 - U+FAD9: 0xEF 0xA9 0xB0 - 0xEF 0xAB 0x99 共105个  
合计：52156个
### 占用4个字节的范围
U+20000 - U+2FA1D: 0xF0 0xA0 0x80 0x80 - 0xF0 0xAF 0xA8 0x9D 共64029个


### cookie 与 storage存储大小  
> 经实际测试得到结果，测试版本 chrome(81.0.4044.138  64位正式版本)

**cookie**： 经本地测试，cookie每个属性的key加上value的大小上限为`4094`个字节，约(`4k 4096字节`)。  
**storage**：同样测试经过，得到storage的存储大小上限为`5242878`个字节，约(`5M 5242880字节`)