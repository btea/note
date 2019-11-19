const VNodeFlags = {
    // html标签
    ELEMENT_HTML: 1,                              // 0000000000000001
    // SVG标签
    ELEMENT_SVG: 1 << 1,                          // 0000000000000010 
    // 普通有状态组件
    COMPONENT_STATEFUL_NORAMAL: 1 << 2,           // 0000000000000100
    // 需要被keepAlive的有状态组件
    COMPONENT_STATEFUL_SHOULD_KEEP_ALIVE: 1 << 3, // 0000000000001000
    // 已经被keepAlive的组件
    COMPONENT_STATEFUL_KEPT_ALIVE: 1 << 4,        // 0000000000010000
    // 函数式组件
    COMPONENT_FUNCTIONAL: 1 << 5,                 // 0000000000100000

    // 纯文本
    TEXT: 1 << 6,                                 // 0000000001000000
    // Fragment
    FRAGMENT: 1 << 7,                             // 0000000010000000
    // Portal
    PORTAL: 1 << 8                                // 0000000100000000
};
// html和svg都是标签元素，可以用ELEMENT表示
VNodeFlags.ELEMENT =           // 00000011
    VNodeFlags.ELEMENT_HTML |  // 00000001
    VNodeFlags.ELEMENT_SVG;    // 00000010

// 普通有状态组件、需要被keepAlive的有状态组件、已经被keepAlive的有状态组件，都是有状态组件，统一用COMPONENT_STATEFUL表示
VNodeFlags.COMPONENT_STATEFUL =                        // 00011100
    VNodeFlags.COMPONENT_STATEFUL_NORAMAL |            // 00000100
    VNodeFlags.COMPONENT_STATEFUL_SHOULD_KEEP_ALIVE |  // 00001000
    VNodeFlags.COMPONENT_STATEFUL_KEPT_ALIVE;          // 00010000


// 有状态组件 和 函数式组件都是"组件, 用COMPONENT表示
VNodeFlags.COMPONENT =                // 00111100
    VNodeFlags.COMPONENT_STATEFUL |   // 00011100
    VNodeFlags.COMPONENT_FUNCTIONAL;  // 00100000


VNodeFlags.ELEMENT_HTML &             // 00000001
	VNodeFlags.ELEMENT_SVG &          // 00000010
	VNodeFlags.ELEMENT                // 00000011
//  => true

const ChildrenFlags = {
	// 未知的children类型
	UNKNOWN_CHILDREN: 0,               // 00000000
	// 没有children                   
	NO_CHILDREN: 1,                    // 00000001
	// children是单个VNode
	SINGLE_VNODE: 1 << 1,              // 00000010
	// children 是多个拥有key的VNode
	KEYED_VNODES: 1 << 2,              // 00000100
	// children 是多个没有key的VNode
	NONE_KEYED_VNODES: 1 << 3          // 00001000
}
// 由于	ChildrenFlags.KEYED_VNODES 和 ChildrenFalgs.NONE_KEYED_VNODES 都属于多个VNode，所以我们可以派生出一个 “多节点” 标识
ChildrenFlags.MULTIPLE_VNODES =        // 00001100
	ChildrenFlags.KEYED_VNODES |       // 00000100
	ChildrenFlags.NONE_KEYED_VNODES;   // 00001000
// 这样判断一个VNode的子节点是否是多个子节点就变得容易多了：
someVNode.childFlags & ChildrenFlags.MULTIPLE_VNODES

import Fragment from './Fragment'
import Portal from './Portal'

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

/********************  
 * 注：以上用于确定childFlags的代码仅限于非组件类型的VNode，因为对于组件类型的VNode来说，它并没有子节点，
 * 所有子节点都应该作为slots存在，所以如果使用h函数创建一个组件类型VNode，那么我们应该把children的内容转化为slots，
 * 然后再把children置为null
 * 
 * 
 *  ********************/