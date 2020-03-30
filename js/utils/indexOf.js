String.prototype.index = function(s, start) {
    var len = this.length, i = start || 0, l = s.length;
    if(s === '') {
        if(!start || start <= 0){
            return 0
        }
        return start < len ? start : len
    }
    for(; i < len; i++){
        if(this.slice(i, i + l) === s) {
            return i
        }
    }
    return -1
}