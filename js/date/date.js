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

    lunarDate(date = new Date()){
        // 设：公元年数 - 1977（或1901）= 4Q + R;
        // 则：阴历日期 = 14Q + 10.6(R + 1) + 年内日期序数 - 29.5n
        // 假设时间为2019-04-23，则年内日期序数为 31 + 28 + 31 + 23
        let year, Q, R, sum;
        date = new Date();
        year = date.getFullYear();
        Q = Math.floor(year - 1977);
        R = (year - 1977) % 4;
        sum = 14 * Q + 10.6 * (R + 1) + this.monthSum(date);
        return Math.floor(sum % 29.5);
    }
    monthSum(date){
        let sum , year, month;
        year = date.getFullYear();
        month = date.getMonth();
        // 假如当前是4月，month值为3,只先累积前三个月的总天数，当月到当前时间未知天数额外添加
        while(month){
            sum += this.getMonth(year, month);
            month--;
        }
        sum += date.getDate();
        return sum;
    }



    // 农历日期获取
    lunar(){
        var CalendarData=new Array(100);
        var madd=new Array(12);
        var tgString="甲乙丙丁戊己庚辛壬癸";
        var dzString="子丑寅卯辰巳午未申酉戌亥";
        var numString="一二三四五六七八九十";
        var monString="正二三四五六七八九十冬腊";
        var weekString="日一二三四五六";
        var sx="鼠牛虎兔龙蛇马羊猴鸡狗猪";
        var cYear,cMonth,cDay,TheDate;
        CalendarData = new Array(0xA4B,0x5164B,0x6A5,0x6D4,0x415B5,0x2B6,0x957,0x2092F,0x497,0x60C96,0xD4A,0xEA5,0x50DA9,0x5AD,0x2B6,0x3126E, 0x92E,0x7192D,0xC95,0xD4A,0x61B4A,0xB55,0x56A,0x4155B, 0x25D,0x92D,0x2192B,0xA95,0x71695,0x6CA,0xB55,0x50AB5,0x4DA,0xA5B,0x30A57,0x52B,0x8152A,0xE95,0x6AA,0x615AA,0xAB5,0x4B6,0x414AE,0xA57,0x526,0x31D26,0xD95,0x70B55,0x56A,0x96D,0x5095D,0x4AD,0xA4D,0x41A4D,0xD25,0x81AA5,0xB54,0xB6A,0x612DA,0x95B,0x49B,0x41497,0xA4B,0xA164B, 0x6A5,0x6D4,0x615B4,0xAB6,0x957,0x5092F,0x497,0x64B, 0x30D4A,0xEA5,0x80D65,0x5AC,0xAB6,0x5126D,0x92E,0xC96,0x41A95,0xD4A,0xDA5,0x20B55,0x56A,0x7155B,0x25D,0x92D,0x5192B,0xA95,0xB4A,0x416AA,0xAD5,0x90AB5,0x4BA,0xA5B, 0x60A57,0x52B,0xA93,0x40E95);
        madd[0]=0;
        madd[1]=31;
        madd[2]=59;
        madd[3]=90;
        madd[4]=120;
        madd[5]=151;
        madd[6]=181;
        madd[7]=212;
        madd[8]=243;
        madd[9]=273;
        madd[10]=304;
        madd[11]=334;

        function GetBit(m,n){
            return (m>>n)&1;
        }
        function e2c(){
            TheDate= (arguments.length!=3) ? new Date() : new Date(arguments[0],arguments[1],arguments[2]);
            var total,m,n,k;
            var isEnd=false;
            var tmp=TheDate.getYear();
            if(tmp<1900){
                tmp+=1900;
            }
            total=(tmp-1921)*365+Math.floor((tmp-1921)/4)+madd[TheDate.getMonth()]+TheDate.getDate()-38;

            if(TheDate.getYear()%4==0&&TheDate.getMonth()>1) {
                total++;
            }
            for(m=0;;m++){
                k=(CalendarData[m]<0xfff)?11:12;
                for(n=k;n>=0;n--){
                    if(total<=29+GetBit(CalendarData[m],n)){
                        isEnd=true; break;
                    }
                    total=total-29-GetBit(CalendarData[m],n);
                }
                if(isEnd) break;
            }
            cYear=1921 + m;
            cMonth=k-n+1;
            cDay=total;
            if(k==12){
                if(cMonth==Math.floor(CalendarData[m]/0x10000)+1){
                    cMonth=1-cMonth;
                }
                if(cMonth>Math.floor(CalendarData[m]/0x10000)+1){
                    cMonth--;
                }
            }
        }

        function GetcDateString(){
            var tmp="";
            tmp+=tgString.charAt((cYear-4)%10);
            tmp+=dzString.charAt((cYear-4)%12);
            tmp+="(";
            tmp+=sx.charAt((cYear-4)%12);
            tmp+=")年 ";
            if(cMonth<1){
                tmp+="(闰)";
                tmp+=monString.charAt(-cMonth-1);
            }else{
                tmp+=monString.charAt(cMonth-1);
            }
            tmp+="月";
            tmp+=(cDay<11)?"初":((cDay<20)?"十":((cDay<30)?"廿":"三十"));
            if (cDay%10!=0||cDay==10){
                tmp+=numString.charAt((cDay-1)%10);
            }
            return tmp;
        }

        function GetLunarDay(solarYear,solarMonth,solarDay){
            if(solarYear<1921 || solarYear>2020){
                return "";
            }else{
                solarMonth = (parseInt(solarMonth)>0) ? (solarMonth-1) : 11;
                e2c(solarYear,solarMonth,solarDay);
                return GetcDateString();
            }
        }

        var D=new Date(this);
        var yy=D.getFullYear();
        var mm=D.getMonth()+1;
        var dd=D.getDate();
        var ww=D.getDay();
        var ss=parseInt(D.getTime() / 1000);
        if (yy<100) yy="19"+yy;
        return GetLunarDay(yy,mm,dd);
    }
}
