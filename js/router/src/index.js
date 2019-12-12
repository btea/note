class Router{
    constructor(routers) {
        this.historyStack = []
        this.registeredRouter = []
        this.otherwiseRouter = {}
        this.init(routers)
    }
    /**  启动路由功能 **/
    init() {
        
    }
    // 绑定window.onhashchange事件回调函数
    bindEvents() {

    }
    // 路由注册方法
    when(path, content) {

    }
    // 判断新添加的路由是否已存在
    hasThisRouter(path) {

    }
    // 路由不存在时的指定地址
    otherwise(path, content) {

    }
    // 路由跳转方法，主动调用时可用于跳转路由
    go(toPath) {

    }
    // 用于将对应路由信息渲染至页面，实现路由切换
    render(content) {

    }
}

let router = new Router()