const {VNodeFlags, ChildrenFlags} = require('../unit/flags')

function render(vnode, container) {
	const prevVNode = container.vnode
	if (prevVNode == null) {
		if (vnode) {
			// 没有旧的 VNode，只有新的 VNode。使用 `mount` 函数挂载全新的 VNode
			mount(vnode, container)
			// 将新的 VNode 添加到 container.vnode 属性下，这样下一次渲染时旧的 VNode就存在了
			container.vnode = vnode
		}
	} else {
		if (vnode) {
			// 有旧的 VNode，也有新的 VNode。则调用 `patch` 函数打补丁
			patch(prevVNode, vnode, container)
			// 更新 container.vnode
			container.vnode = vnode
		} else {
			// 有旧的 VNode 但是没有新的 VNode，这说明应该移除 DOM,在浏览器中可以使用 removeChild函数。
			container.removeChild(prevVNode.el)
			container.vnode = null
		}
	}
}

function mount(vnode, container) {
	const { flags } = vnode
	if (flags & VNodeFlags.ELEMENT_HTML) {
		// 挂载普通标签
		mountElement(vnode, container)
	} else if (flags & VNodeFlags.COMPONENT) {
		// 挂载组件
		mountComponent(vnode, container)
	} else if (flags & VNodeFlags.TEXT) {
		// 挂载存文本
		mountText(vnode, container)
	} else if (flags & VNodeFlags.FRAGMENT) {
		// 挂载Fragment
		mountFragment(vnode, container)
	} else if (flags & VNodeFlags.PORTAL) {
		// 挂载 Portal
		mountPortal(vnode, container)
	}
}

// 处理VNodeData中除 class 和 style 之外的全部数据，当然也要排除 VNodeData中的target属性，因为它只适用于 Portal
const domPropsRE = /\[A-Z]|^(?:value|checked|slected|muted)$/

function mountElement(vnode, container, isSVG) {
	// 注：运算符优先级  逻辑或 5 (||)从左到右  按位与 9(&) 从左到右

	// 4、处理SVG标签
	isSVG = isSvg || vnode.flags & VNodeFlags.ELEMENT_SVG
	const el = isSVG 
		? document.createElementNS('http://www.w3.org/2000/svg', vnode.tag) 
		: document.createElement(vnode.tag)
	vnode.el = el // 1、VNode渲染成真实DOM之后，引用真实DOM

	// 拿到 VNodeData
	const data = vnode.data
	if (data) {
		// 如果data存在，则遍历   2、将VNodeData应用到真实DOM元素上
		for (let key in data) {
			// key可能是class、style、on等等
			switch(key) {
				case 'style':
					// 如果 key 的值是 style，说明是内联样式，逐个将样式规则应用到 el
					for(let k in data.style) {
						el.style[k] = data.style[k]
					}
					break
				case 'class':
					el.className = dynamicClass(data[key])
					break
				default:
					if (domPropsRE.test(key)) {
						// 当做 DOM Prop处理
						el[key] = data[key]
					} else {
						// 当作 Attr 处理
						el.setAttribute(key, data[key])
					}
					break

			}
		}
	}

	// 3、继续挂载子节点
	// 拿到children 和 childFlags
	const childFlags = vnode.childFlags
	const children = vnode.children
	// 检测如果没有子节点则无需递归挂载
	if (childFlags !== ChildrenFlags.NO_CHILDREN) {
		if (childFlags & ChildrenFlags.SINGLE_VNODE) {
			// 单个子节点则调用mount挂载
			mount(children, el, isSVG) // 把isSvg传递下去，方便后续判断渲染svg里面circle等元素tag不等于svg时渲染svg标签
		} else if (childFlags & ChildrenFlags.MULTIPLE_VNODES) {
			// 如果是多个子节点，则遍历并调用 mount 函数挂载
			for (let i = 0; i < children.length; i++) {
				mount(children[i], el, isSVG)
			}
		}
	}


	// 处理svg标签
	container.appendChild(el) // 
}

function dynamicClass(className) {
	if (typeof className === 'string') {
		return className
	}
	if (typeof className === 'object') {
		if (Array.isArray(className)) {
			let str = ''
			for (let i = 0; i < className.length; i++) {
				if (typeof className[i] === 'string') {
					str += className[i] + ' '
				} else if(typeof className[i] === 'object') {
					str += dynamicClass(className[i])
				}
			}
			return str || ''
		} else {
			let str = ''
			for (let key in className) {
				if (typeof className[key] === 'boolean' && className[key] ) {
					str += key + ' '
				} else if (typeof className[key] === 'object') {
					str += dynamicClass(className[key])
				}
			}
			return str || ''
		}
		
	}
	return ''
}