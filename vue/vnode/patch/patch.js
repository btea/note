// patch 函数会对新旧 VNode 进行比对，也就是我们所说的 diff，那么不同的两个 VNode 之间应该遵守怎样的比对规则呢？
// 其实这个问题很容易回答，我们知道 VNode 有类型之分，不同类型的 VNode 之间存在一定的差异，所以不同的 VNode 之间第一个比对原则就是：
// 只有相同类型的 VNode 才有比对的意义，例如我们有两个 VNode，其中一个 VNode 的类型是标签元素，而另一个 VNode 的类型是组件，当这两个 VNode 进行比对时，
// 最优的做法是使用新的 VNode 完全替换旧的 VNode，换句话说我们根本就没有做任何比对的操作，因为这完全没有意义。
import {VNodeFlags, ChildrenFlags}  from './flags'

export function patch(prevVNode, nextVNode, container) {
	// 分别拿到新旧 VNode 的类型，即 flags
	const nextFlags = nextVNode.flags
	const prevFlags = prevVNode.flags

	// 检查新旧 VNode 的类型是否相同，如果类型不同，则直接调用 replaceVNode 函数替换 VNode
	// 如果新旧 VNode 类型不同，则根据不同类型调用不同的对比函数
	if (prevFlags !== nextFlags) {
		replaceVNode(prevVNode, nextVNode, container)
	} else if (nextFlags & VNodeFlags.ELEMENT) {
		patchElement(prevVNode, nextVNode, container)
	} else if (nextFlags & VNodeFlags.COMPONENT) {
		patchComponent(prevVNode, nextVNode, container)
	} else if (nextFlags & VNodeFlags.TEXT) {
		patchText(prevVNode, nextVNode)
	} else if (nextFlags & VNodeFlags.FRAGMENT) {
		patchFragment(prevVNode, nextVNode, container)
	} else if (nextFlags & VNodeFlags.PORTAL) {
		patchPortal(prevVNode, nextVNode)
	}
}

// 替换 VNode
function replaceVNode(prevVNode, nextVNode, container) {
	// 将旧的 VNode 所渲染的 DOM 从容器中移除
	container.removeChild(prevVNode.el)
	// 再把新的 VNode 挂载到容器上
	mount(nextVNode, container)
}