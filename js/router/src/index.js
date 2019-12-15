class Router{
    constructor(routers) {
        this.historyStack = []
        this.registeredRouter = []
        this.otherwiseRouter = {}
        this.init(routers)
    }
	/**  启动路由功能 **/
    init(router) {
        if (this.isObject(router)) {
			this.type = router.mode || 'hash'
			this.routesList(router.routes)
			this.bindEvents()
		} else {
			throw Error('this parameters must be object')
		}
	}
	routesList(routes, parent) {
		if (Array.isArray(routes)) {
			return routes.map(r => this.initRoute(r, parent))	
		}
	}
	initRoute(route, parent) {
		if (this.isObject(route)) {
			if (route.path === '/') {
				this.otherwiseRouter = route
			} else {
				if (parent) {
					route.path = parent.path + route.path
					route.parent = parent
				}
				// this.historyStack.push(route)
				if (route.children) {
					route.children = this.routesList(route.children, route)
				}
				this.registeredRouter.push(route)
				return route
			}
		}
	}
	isObject(obj) {
		return Object.prototype.toString.call(obj) === '[object Object]'
	} 
    // 绑定window.onhashchange事件回调函数
    bindEvents() {
		if (this.type === 'hash') {
			window.addEventListener('hashchange', (e) => {
				let hash = location.hash
				console.log(e, hash)
			})
		} else {
			window.addEventListener('popstate', (e) => {
				console.log(e)
			})
		}
    }
    // 路由注册方法
    when(path, content) {
		if (path.charAt(0) !== '/') {
			path = '/' + path
		}
		if (this.type === 'hash') {
			location.hash = '#' + path
		} else {
			history.pushState(route, '', path)
		}
		this.render(content)
    }
    // 判断新添加的路由是否已存在
    hasThisRouter(path) {
		return !!this.registeredRouter.find(r => r.path.indexOf(path) > -1)
    }
    // 路由不存在时的指定地址
    otherwise(path, content) {
		this.go(this.otherwiseRouter.redirect)
    }
    // 路由跳转方法，主动调用时可用于跳转路由
    go(toPath) {
		if (!toPath) {
			throw Error('the first params is required.')
		}
		if (toPath.charAt(0) !== '/') {
			toPath = '/' + toPath
		}
		let route
		for (let i = 0; i < this.registeredRouter.length; i++) {
			if (this.registeredRouter[i].path === toPath) {
				route = this.registeredRouter[i]
				break
			}
		}
		if (route) {
			route = this.otherwiseRouter
		}
		this.when(route.path, route.content)
    }
    // 用于将对应路由信息渲染至页面，实现路由切换
    render(content) {
		document.getElementById('content').innerHTML = content
    }
}
import router from './router'
console.log(router)
let route = new Router(router)
console.log(route)