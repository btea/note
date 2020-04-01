require([
    './a.js',
    './b.js',
    './m/c.js',
    '../c.js'
], function(a, b, c, c1) {
    'use strict';
    console.log('start');
    a();
    console.log(b);
    console.log(c);
    console.log(c1);
    c1.say();
    console.log(this)
});