require.config({
    paths: {
        'jquery': '',
        'lodash': './lib/lodash.js',      
    }
})



require([
    './a.js',
    'text!./v.vue'
], function(a, html) {
    'use strict';
    console.log(html);
    console.log('start');
    a();
});