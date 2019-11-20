const {VNodeFlags, ChildrenFlags} = require('../unit/flags')
import { createTextVNode } from '../h'

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

function mount(vnode, container, isSVG) {
	const { flags } = vnode
	if (flags & VNodeFlags.ELEMENT_HTML) {
		// 挂载普通标签
		mountElement(vnode, container)
	} else if (flags & VNodeFlags.COMPONENT, isSVG) {
		// 挂载组件
		mountComponent(vnode, container, isSVG)
	} else if (flags & VNodeFlags.TEXT) {
		// 挂载存文本
		mountText(vnode, container)
	} else if (flags & VNodeFlags.FRAGMENT) {
		// 挂载Fragment
		mountFragment(vnode, container, isSVG)
	} else if (flags & VNodeFlags.PORTAL) {
		// 挂载 Portal
		mountPortal(vnode, container, isSVG)
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
					// 事件处理
					if (key[0] === 'o' && key[1] === 'n') {
						el.addEventListener(key.slice(2), data[key])
						// 注：如此一来，所有以 'on' 开头的属性都被判定为事件
					} else if (domPropsRE.test(key)) {
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

// 挂载组件
function mountComponent(vnode, container, isSVG) {
	if (vnode.flags & VNodeFlags.COMPONENT_STATEFUL) {
		mountStatefulComponent(vnode, container, isSVG)
	} else {
		mountFunctionalComponent(vnode, container, isSVG)
	}
}
// 挂载有状态组件
function mountStatefulComponent(vnode, container, isSVG) {
	// 1、创建组件实例
	// 如果一个 VNode 描述的是有状态组件，那么 vnode.tag属性值就是组件类的引用，所以通过 new 关键字创建组件实例
	const instance = new vnode.tag
	// 2、获取组件产出的 Vnode
	// 一个组件的核心就是其 render 函数，通过调用 render 函数可以拿到该组件要渲染的内容
	instance.$vnode = instance.render()
	// 3、mount挂载
	// 既然已经拿到了 VNode，那么将其挂载到 container 上就可以了
	mount(instance.$vnode, container, isSVG)
	// 4、让组件实例的 $el 属性和 vnode.el 属性的值引用组件的根DOM元素
	// 组件的 render 函数会返回该组件产出的 VNode，当该 VNode 被挂载为真实DOM之后，
	// 就可以通过 instance.$vnode.el 元素拿到组件的根DOM元素，接着我们就可以让组件实例的 $el 属性和 vnode.el 属性的值都引用该DOM元素。
	// 如果组件的 render 返回的是一个片段(Fragment)，那么 instance.$el 和 vnode.el 引用的就是该片段的第一个DOM元素
	instance.$el = vnode.el = instance.$vnode.el
}

// 挂载函数式组件
function mountFunctionalComponent(vnode, container, isSVG) {
	// 获取vnode
	const $vnode = vnode.tag()
	// 挂载
	mount($vnode, container, isSVG)
	// el元素引用该组件的根元素
	vnode.el = $vnode.el
}

// 挂载纯文本
function mountText(vnode, container) {
	const el = document.createTextNode(vnode.children)
	vnode.el = el
	container.appendChild(el)
}

// 挂载Fragment
// 如果只有一个节点 el 属性指向该节点；如果有多个节点，则 el 属性指向第一个节点的引用；如果片段中没有节点，即空片段，则 el 属性引用的是占位的空文本节点元素
function mountFragment(vnode, container, isSVG) {
	// 拿到children 和 childFlags
	const {children, childFlags} = vnode
	switch (childFlags) {
		case ChildrenFlags.SINGLE_VNODE:
			mount(children, container, isSVG)
			// 单个子节点，就指向该节点
			vnode.el = children.el
			break
		case ChildrenFlags.NO_CHILDREN:
			// 没有子节点，等价于挂载空片段，会创建一个空的文本节点占位
			const placeholder = createTextVNode('')
			mountText(placeholder, container)
			// 没有子节点指向占位的空文本节点
			vnode.el = placeholder.el
			break
		default:
			// 多个子节点，遍历挂载
			for (let i = 0; i < children.length; i++) {
				mount(children[i], container, isSVG)
			}
			// 多个节点，指向第一个节点
			vnode.el = children[0].el
			break
	}
}

// 挂载 Portal
// Portal 可以不严谨的认为是 可以被到处挂载的 Fragment。类型为 Fragment 的 VNode 其 tag 属性为 null,
// 而类型是 Portal 的 VNode 其 tag 属性值为挂载点(选择器或真实DOM元素)。


function mountPortal(vnode, container, isSVG) {
	const {tag, children, childFlags} = vnode

	// 获取挂载点
	const target = typeof tag === 'string' ? document.querySelector(tag) : tag

	if (childFlags & childFlags.SINGLE_VNODE) {
		// 将children挂载到target上，而非container
		mount(children, target)
	} else if (childFlags & childFlags.MULTIPLE_VNODES) {
		for (let i = 0; i < children.length; i++) {
			mount(children[i], target)
		}
	}
	// 那么对于 Portal 类型的 VNode 其 el 属性应该指向谁呢？应该指向挂载点元素吗？
	// 实际上虽然 Portal 所描述的内容可以被挂载到任何位置，但仍然需要一个占位元素，
	// 并且 Portal 类型的 VNode 其 el 属性应该指向该占位元素，为什么这么设计呢？
	// 这是因为 Portal 的另外一个特性：虽然 Portal 的内容可以被渲染到任意位置，但它的行为仍然像普通的DOM元素一样，
	// 如事件的捕获/冒泡机制仍然按照代码所编写的DOM结构实施。要实现这个功能就必须需要一个占位的DOM元素来承接事件。
	// 但目前来说，我们用一个空的文本节点占位即可
	
	// 占位的空文本节点
	const placeholder = createTextVNode('')
	// 将该节点挂载到 container 中
	mountText(placeholder, container, null)
	// el属性引用该节点
	vnode.el = placeholder.el

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