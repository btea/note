
var painterCtors = {
    canvas: Painter
}

function init(dom, opts) {
    var zr = new ZRender(guid(), dom, opts)
    return zr
}

function ZRender(id, dom, opts) {
    opts = opts || {}
    this.dom = dom
    this.id = id
    var self = this
    var storage = new Storage()
    var renderType = opts.renderer // todo webgl
    renderType = 'canvas'
    

}

function Storage() {

}