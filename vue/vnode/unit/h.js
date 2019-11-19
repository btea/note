const {VNodeFlags, ChildrenFlags} = require('./flags')
const {Fragment} = require('./Fragment')
const {Portal} = require('./Portal')

function h(tag, data = null, children = null){
	let flags = null
	if (typeof tag === 'string') {
		flags = tag === 'svg' ? VNodeFlags.ELEMENT_SVG : VNodeFlags.ELEMENT_HTML
	} else if (tag === Fragment) {
		flags = VNodeFlags.FRAGMENT
	} else if (tag === Portal) {
		flags = VNodeFlags.PORTAL
		tag = data && data.target
	} else {
		// 兼容vue2的对象式组件
		if (tag !== null && typeof tag === 'object') {
			flags = tag.functional ? VNodeFlags.COMPONENT_FUNCTIONAL : VNodeFlags.COMPONENT_STATEFUL_NORAMAL
		} else if (typeof tag === 'function') {
			// vue3 的类组件
			flags = tag.prototype && tag.prototype.render ? VNodeFlags.COMPONENT_STATEFUL_NORAMAL : VNodeFlags.COMPONENT_FUNCTIONAL
		}
	}

	// 确定childFlags
	let childFlags = null
	if (Array.isArray(children)) {
		const { length } = children
		if (!length) {
			childFlags = ChildrenFlags.NO_CHILDREN
		} else if (length === 1) {
			childFlags = ChildrenFlags.SINGLE_VNODE
		} else {
			// 多个子节点，且子节点使用key
			// ? 此处多个子节点直接被当做使用了key的子节点，是因为在下面 normalizeVNodes函数里面直接人为添加了key ?
			childFlags = ChildrenFlags.KEYED_VNODES
			children = normalizeVNodes(children)
		}
	} else if (children == null) {
		childFlags = ChildrenFlags.NO_CHILDREN
	} else if (children._isVNode) {
		// 单个子节点
		childFlags = ChildrenFlags.SINGLE_VNODE
	} else {
		// 其他情况都作为文本节点处理，即单个子节点，会调用createTextVNode创建纯文本类型的 VNode
		childFlags = ChildrenFlags.SINGLE_VNODE
		children = createTextVNode(children + '')
	}

	return {
		_isVNode: true, // 始终为true
		flags: flags,
		tag: tag,
		data: data,
		children: children,
		childFlags: childFlags,
		el: null
	}
}

function normalizeVNodes(children) {
	const newChild = []
	for (let i = 0; i < children.length; i++) {
		const child = children[i]
		if (child.key == null) {
			child.key = '|' + i
		}
		newChild.push(child)
	}
	// 返回新的children，此时children的类型就是 ChildrenFlags.KEYED_VNODES
	return newChild
}

function createTextVNode(text) {
	return {
		_isVNode: true,
		flags: VNodeFlags.TEXT,
		tag: null,
		data: null,
		// 纯文本类型的 VNode，其children属性存储的是与之相符的文本内容
		children: text,
		// 文本节点没有子节点
		childFlags: VNodeFlags.NO_CHILDREN,
		el: null
	}
}

module.exports = {
	h
}