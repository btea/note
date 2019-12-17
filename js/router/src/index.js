class Router{
    constructor(routers) {
        this.historyStack = []
		this.registeredRouter = []
		this.homeRouter = {}
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
				this.homeRouter = route
			} else {
				if (route.redirect) {
					this.otherwiseRouter = route
				}
				if (parent) {
					route.path = parent.path + route.path
					route.parent = parent
				}
				// this.historyStack.push(route)
				if (route.children) {
					route.children = this.routesList(route.children, route)
				}
			}
			this.registeredRouter.push(route)
			return route
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
				this.viewChange(hash.slice(1))
			})
		} else {
			window.addEventListener('popstate', (e) => {
				let state = e.state || this.homeRouter
				this.viewChange(state.path)
			})
		}
	}
	// 手动操作浏览器前进后退按钮时，路由变化，对应的内容也要进行变化
	viewChange(path) {
		if (!path) {
			throw Error('the path params is required.')
		}
		if (path.charAt(0) !== '/') {
			path = '/' + path
		}
		let route
		for (let i = 0; i < this.registeredRouter.length; i++) {
			if (this.registeredRouter[i].path === path) {
				route = this.registeredRouter[i]
				break
			}
		}
		if (!route) {
			route = this.homeRouter
		}
		this.render(route.content)
	}
    // 路由注册方法
    when(path, content, route) {
		if (path.charAt(0) !== '/') {
			path = '/' + path
		}
		if (path !== '/') {
			if (this.type === 'hash') {
				location.hash = '#' + path
			} else {
				history.pushState(route, '', path)
			}
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
		if (!route) {
			route = this.homeRouter
		}
		this.when(route.path, route.content, route)
    }
    // 用于将对应路由信息渲染至页面，实现路由切换
    render(content) {
		document.getElementById('content').innerHTML = content
	}
	// 直接用代码实现路由跳转
	push (info) {
		/** 
		 * @params info String 直接跳转至指定路由
		 * @params info Object info.path
		*/
		let path
		if (typeof info === 'String') {
			path = info
		}else if (this.isObject(info)) {
			path = info.path
		}
		if (path) {
			this.go(path)
		}
	}
}
import router from './router'
let route = new Router(router)
route.go('/')
let els = document.getElementsByClassName('change')[0]
els.addEventListener('click', e => {
	let el = e.target
	if (el.tagName === 'LI') {
		route.go(el.getAttribute('to'))
	}
})
let children = document.getElementsByClassName('children')[0]
children.addEventListener('click', e => {
	route.go('/b/com')
})