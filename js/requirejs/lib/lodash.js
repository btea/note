define(function() {
  'use strict';
  var _ = {};
  _.isArray = (function(){
    if(Array.isArray){
      return Array.isArray;
    }
    return function(arr){
      return arr instanceof Array;
    }
  })();
  return _;
});