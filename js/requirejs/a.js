define(['./c.js'], function(c) {
    'use strict';
    console.log(c.timeList);


    function createDate(){
        let app = document.getElementById('app');
        let time = c.timeList;
        let head = document.createElement('ul');
        head.classList = 'date head';
        let body = document.createElement('ul');
        body.classList = 'date body';
        let headText = ['周一','周二','周三','周四','周五','周六','周日'];
        for(let i = 0; i < headText.length; i++){
            let li = document.createElement('li');
            li.classList = 'item';
            li.innerText = headText[i];
            head.appendChild(li);
        }
        app.appendChild(head);

        for(let j = 0; j < time.length; j++){
            let li = document.createElement('li');
            li.classList = 'item';
            if(time[j].num){
                li.classList.add('real-time');
            }
            li.dataset.t = time[j].time;
            li.innerText = time[j].num || '';
            body.appendChild(li);
        }
        app.appendChild(body);


    }
    createDate();


    return function(){
        console.log('a');
        console.log(c);
        c.say();
    }
});