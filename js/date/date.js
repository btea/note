class Day{

    // 通过年月获取该月份天数
    getMonth(year, month){
        /**
         * @param year,想要查询的年份，可以是数字也可以是字符串
         * @param month,要获取天数分月份，按常规默认从0开始，但在此方法中从1开始，1则表示一月   
         *  
         * */
        return new Date(year, month, 0).getDate();
    }

    monthNext(n, date){
        /**
         * @param n,表示根据日期往后推算的月数
         * @param date,用来推算的时间，如果不传，则默认使用当前时间 
         * */
        let d = date ? new Date(date) : new Date();
        return this.dateResult(d, d.getMonth() + n);
    }

    monthNext(n, date){
        /**
         * @param n,表示根据日期往后推算的月数
         * @param date,用来推算的时间，如果不传，则默认使用当前时间 
         * */
        let d = date ? new Date(date) : new Date();
        return this.dateResult(d, d.getMonth() + n);
    }

    dateResult(d, month){
        return new Date(d.getFullYear, month, d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds());
    }

    // 获取日期的后几天
    dayNext(n, date){
        let d = date ? new Date(date) : new Date();
        return new Date(new Date(d).getTime() + n * 24 * 3600 * 1000);
    }
    // 获取日期的前几天
    dayPrevious(n, date){
        let d = date ? new Date(date) : new Date();
        return new Date(new Date(d).getTime() - n * 24 * 3600 * 1000);
    }

    // 获取星期
    week(date = new Date(), prefix){
        let word = {
            0: '日',
            1: '一',
            2: '二',
            3: '三',
            4: '四',
            5: '五',
            6: '六'
        }
        return (prefix || '') + word[date.getDay()]; 
    }

    binaryConversion(from, to){
        /***
         * @param from 需要进行转换的参数
         * @param to 结果要转换成的进制 
         * */
        // 进制转换可以直接用 toString(n)



        // 默认先实现十进制转换十六进制
        let result, remainder, arr = [],
            obj = {
                10: 'a',
                11: 'b',
                12: 'c',
                13: 'd',
                14: 'e',
                15: 'f'
            },
            str
        ;
        do{
            result = Math.floor(from / to);
            remainder = from % to;
            arr.push(remainder);
            from = result;
        }while(result >= to)
        arr.push(result);
        arr.forEach((item,i) => {
            if(item >= 10){
                arr[i] = obj[item]; 
            }
        });
        arr.reverse();
        str = arr.join('');
        return '\\u' + str;
    }
       
    // 通过传入的字符串格式对时间进行格式化
    format(str){
        let date = new Date(this),
            y = date.getFullYear(),
            m = date.getMonth() + 1,
            d = date.getDate(),
            h = date.getHours(),
            $m = date.getMinutes(),
            s = date.getSeconds()
        ;
        str = str.replace(/y{4}/,y);
        str = str.replace(/M{2}/, m > 10 ? m : '0' + m);
        str = str.replace(/d{2}/, d > 10 ? d : '0' + d);
        str = str.replace(/h{2}/, h > 10 ? h : '0' + h);
        str = str.replace(/m{2}/, $m > 10 ? $m : '0' + $m);
        str = str.replace(/s{2}/, s > 10 ? s : '0' + s);
        return str;
    }

}
