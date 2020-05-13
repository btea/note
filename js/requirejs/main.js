require.config({
    paths: {
        'jquery': '',
        'lodash': './lib/lodash.js',      
    }
})



require([
    './a.js',
], function(a) {
    'use strict';
    console.log('start');
    a();
});