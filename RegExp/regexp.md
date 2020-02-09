## 正则匹配位置  
^、$、\b、\B、(?=p)、(?!p)
### ^ 和 $
^(脱字符) 匹配开头，在多行匹配中匹配开头  
$(美元符号)匹配结尾，在多行匹配中匹配结尾  

### \b 和 \B
\b 是单词边界，具体就是\w 和 \W之间的位置，也包括 \w 与 ^ 之间的位置，和 \w 与 $ 之间的位置。
(注：\w 是字符组[0-9a-zA-Z_]的简写
\B 就是 \b的反面，非单词边界。例如在字符串中所有位置中，扣掉\b,剩下的都是 \B的。具体来说就是 \w 与 \w,
\W 与 \W,^ 与 \W , \W 与 $之间的位置。

### (?=p) 和 (?!p)  
(?=p), 其中 p是一个子模式，即p前面的位置，或者说，该位置后面的字符要匹配p。
比如，(?=l),表示“l”字符前面的位置。
(?!p), 表示(?=p)的反面的意思。  
二者的学名分别是 positive lookahead（正向先行断言） 和 negative lookahead（负向先行断言）。  
栗子：数字千位分隔符表示法  
'123456789'.replace(/(?!^)(?=(\d{3})+$)/g, ',')  => '123,456,789'

## 反向引用
\1  \2  \3、、、  
\1 表示匹配第一个分组内容， \2 表示匹配第二个分组内容，当多个括号嵌套时，以左括号（开括号）为准。  

## 非捕获括号
### (?:p) 和 (?:p1|p2|p3)
栗子：将每个单词的首字母转换为大写
```javascript
function titleize(str) {
    return str.toLowerCase().replace(/(?:^|\s)\w/g, function(c) {
        return c.toUpperCase()
    })
}
```
栗子：驼峰化
```javascript
function camelize(str) {
    return sre.replace(/[-_\s]+(.)?/g, function(match, c) {
        return c ? c.toUpperCase() : ''
    })
}
```
栗子：中划线化(逆驼峰化)
```javascript
function dasherize(str) {
    return str.replace(/([A-Z])/g, '-$1').replace(/[-_\s]+/g, '-').toLowerCase()
}
```


