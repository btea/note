define(function(){
    var z = {
        name: 'z module',
        age: 200,
        say: function(){
            console.log(`%cmy name is ${this.name}, my age is ${this.age} and my word  no game no life. 空白永不败北！`, `color: aqua; font-size: 20px; background: linear-gradient(217deg, rgba(255,0,0,.8), rgba(255,0,0,0) 70.71%),
            linear-gradient(127deg, rgba(0,255,0,.8), rgba(0,255,0,0) 70.71%),
            linear-gradient(336deg, rgba(0,0,255,.8), rgba(0,0,255,0) 70.71%)`);
        },
    };
    return z;
});