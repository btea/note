define(function(){
    function getDate(){
        let date = new Date();
        let y = new Date().getFullYear();
        let m = date.getMonth();
        let total = new Date(y, m + 1, 0).getDate();
        let week = new Date(y, m, 1).getDay();
        let num;
        if(!week){
            num = 6;
        }else{
            num = week;
        }
        let arr = new Array(num).fill('');
        for(let i = 0; i < total; i++){
            arr.push({
                num: i + 1,
                time: new Date(y, m, i +1)
            })
        }
        return arr;
    }
    return {
        name: 'z',
        age: 20,
        say: function(){
            console.log(`%cmy name is ${this.name}, my age is ${this.age} and my word  no game no life.`, `color: aqua; font-size: 20px; background: linear-gradient(217deg, rgba(255,0,0,.8), rgba(255,0,0,0) 70.71%),
            linear-gradient(127deg, rgba(0,255,0,.8), rgba(0,255,0,0) 70.71%),
            linear-gradient(336deg, rgba(0,0,255,.8), rgba(0,0,255,0) 70.71%)`);
        },
        timeList: getDate()
    }
})