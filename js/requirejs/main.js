require.config({
    paths: {
        'jquery': '',
        'lodash': '',
        
    }
})



require([
    './a.js'
], function(a) {
    'use strict';
    console.log('start');
    a();
});