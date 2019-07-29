// https://github.com/USTB-musion/fee-skills/issues/8
// https://segmentfault.com/a/1190000012943992?utm_source=tag-newest
let fs = require('fs');
let http = require('http');
let esprima = require('esprima');
let code = 'function ast(){}';
let ast = esprima.parse(code);
// console.log(ast);

const path = '../js/apply.js';
http.createServer((req, res) => {
    fs.readFile(path, (err, str) => {
        if(err){
            throw Error(err);
        }
        str = str.toString();
        let AST = esprima.parse(str);
        res.end(JSON.stringify(AST));
        console.log(AST.body[0]);
    })
}).listen(2233);
