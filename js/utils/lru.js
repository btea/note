// LRU算法（Least Recently Used） vue keep-alive以及浏览器缓存都采用这种算法  
function LRUCache(n) {
    /**
     * @params n 缓存容量
    */
    this.length = n
    this.keys = []
    this.values = []
}
LRUCache.prototype.put = function(key, value) {
    if (this.keys.length === this.length) {
        this.keys.shift()
        this.values.shift()
    }
    this.keys.push(key)
    this.values.push(value)
}
LRUCache.prototype.get = function(key) {
    let i = this.keys.indexOf(key)
    if (i < 0) {return -1}
    let val
    if (i < this.keys.length - 1) {
        // 返回当前值，并把对应的key以及对应值放置在最新位置
        let key
        key = this.keys.splice(i, 1)[0]
        val = this.values.splice(i, 1)[0]
        this.keys.push(key)
        this.values.push(val)
    }else {
        val = this.values[this.length - 1]
    }
    return val
} 
