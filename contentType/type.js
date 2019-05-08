const fs = require('fs');
const http = require('http');
const cheerio = require('cheerio');

http.get('http://tool.oschina.net/commons', function(res){
        let data = '';
        // res.setEnconding('utf8');
        res.on('data', function(chunk){
            data += chunk;
        });
        res.on('end', function(){
            const ele = cheerio.load(data);
            const list = ele('tbody td');
            const arr = [], obj = {};
            [].forEach.call(list, function(item){
                arr.push(cheerio.load(item).text());
            });
            for(let i = 0; i < arr.length - 2; i += 2){
                obj[arr[i]] = arr[i + 1];
            }
            fs.writeFile('./type.json', JSON.stringify(obj).replace(/,/g,',\n'), function(err){
                if(err){
                    console.log('write fail');
                }else{
                    console.log('write success');
                }
            })
        })
    }
)

