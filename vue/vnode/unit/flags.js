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

// children 和 ChildrenFlags
// 子节点
// 总的来说有一下几种
// 1、没有子节点
// 2、只有一个子节点
// 3、多个子节点
//   ·有key
//   ·无key
// 4、不知道子节点情况
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
// someVNode.childFlags & ChildrenFlags.MULTIPLE_VNODES
module.exports = {
	VNodeFlags,
	ChildrenFlags
}