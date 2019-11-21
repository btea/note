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


function patchElement(prevVNode, nextVNode, container) {
	// 如果新的 VNode 描述的是不同的标签，则调用 replaceVNode 函数，使用新的 VNode 替换旧的 VNode
	if (prevVNode.tag !== nextVNode.tag) {
		replaceVNode(prevVNode, nextVNode, container)
		return
	} 
	// 如果标签相同，那两个 VNode 之间的差异就只会出现在 VNodeData 和 children 上了，所以对于描述相同标签的两个 VNode 之间的比对，
	// 本质上就是对 VNodeData 和 children 的比对

	// 拿到 el 元素，注意这时要让 nextVNode.el 也引用该元素 
	const el = (nextVNode.el = prevVNode.el)
	// 拿到新旧 VNodeData
	const prevData = prevVNode.data
	const nextData = nextVNode.data
	// 新的VNodeData存在时才有必要更新   ?(注：若新的VNodeData不存在应该将之前的VNodeData全部清除吧？)
	if (nextData) {
		// 遍历新的 VNodeData ，将旧值和新值传递给 patchData函数
		for (let key in nextData) {
			const prevValue = prevData[key]
			const nextValue = nextData[key]
			patchData(el, key, prevValue, nextValue)
		}
		// for (let key in nextData) {
		// 	// 根据key拿到新旧 VNodeData 的值
		// 	const prevValue = prevData[key]
		// 	const nextValue = nextData[key]
		// 	switch(key) {
		// 		case 'style':
		// 			// 遍历新 VNodeData 中的 style 数据，将新的样式应用到元素
		// 			for (let k in nextValue) {
		// 				el.style[k] = nextValue[k]
		// 			}
		// 			// 遍历旧的 VNodeData ，将不存在于新的 VNodeData 中的样式清除
		// 			for (let k in prevValue) {
		// 				if (!nextValue.hasOwnProperty(k)) {
		// 					el.style[k] = ''
		// 				}
		// 			}
		// 			break
		// 		default:
		// 			break
		// 	}
		// }
	}
	if (prevData) {
		// 遍历旧的 VNodeData，将不存在与新的 VNodeData 中的数据移除
		for (let key in prevData) {
			const prevValue = prevData[key]
			if (prevValue && !nextData.hasOwnProperty(key)) {
				// 第四个参数为null代表移除数据
				patchData(el, key, prevValue, null)
			}
		}
	}

	// 调用 patchChildren 函数递归更新子节点
	patchChildren(
		prevVNode.childFlags, // 旧的 VNode 子节点类型
		nextVNode.childFlags, // 新的 VNode 子节点类型
		prevVNode.children,   // 旧的 VNode 子节点
		nextVNode.children,   // 新的 VNode 子节点
		el                    // 当前标签元素，即这些子节点的父节点
	)
}

function patchData(el, key, prevValue, nextValue) {
	switch(key) {
		case 'style':
			// 如果 key 的值是 style，说明是内联样式，逐个将样式规则应用到 el
			for (let k in nextValue) {
				el.style[k] = nextValue[k]
			}
			// 遍历旧的 VNodeData ，将不存在于新的 VNodeData 中的样式清除
			for (let k in prevValue) {
				// 当旧VNodeData存在style属性，而新的VNode不存在时，应该将VNode所有原本存在的属性都清空
				if (!nextValue || !nextValue.hasOwnProperty(k)) {
					el.style[k] = ''
				}
			}
			break
		case 'class':
			el.className = dynamicClass(nextValue[key])
			break
		default:
			// 事件处理
			if (key[0] === 'o' && key[1] === 'n') {
				// 移除旧事件
				if (prevValue) {
					el.addEventListener(key.slice(2), prevValue)
				}
				// 添加新事件
				if (nextValue) {
					el.addEventListener(key.slice(2), nextValue)
				}
				// 注：如此一来，所有以 'on' 开头的属性都被判定为事件
			} else if (domPropsRE.test(key)) {
				// 当做 DOM Prop处理
				el[key] = nextValue
			} else {
				// 当作 Attr 处理
				el.setAttribute(key, nextValue)
			}
			break
	}
}

function patchChildren(
	prevChildFlags,
	nextChildFlags,
	prevChildren,
	nextChildren,
	container
) {
	switch (prevChildFlags) {
		// 旧的 children 是单个子节点
		case ChildrenFlags.SINGLE_VNODE:
			switch(nextChildFlags) {
				case ChildrenFlags.SINGLE_VNODE: 
					// 新的 children 也是单个子节点
					// 此时 prevChildren 和 nextChildren 都是VNode对象
					patch(prevChildren, nextChildren, container)
					break
				case ChildrenFlags.NO_CHILDREN:
					// 新的 children 没有子节点
					container.removeChild(prevChildren.el)
					break
				default:
					// 新的 children 有多个子节点
					// 移除单个旧的节点
					container.removeChild(prevChildren.el)
					// 遍历新的多个子节点，逐个挂载到容器上
					for (let i = 0; i < nextChildren.length; i++) {
						mount(nextChildren[i], container)
					}
					break
			}
			break
		// 旧的 children 没有子节点
		case ChildrenFlags.NO_CHILDREN:
			switch(nextChildFlags) {
				case ChildrenFlags.SINGLE_VNODE: 
					// 新的 children 也是单个子节点
					// 使用 mount 函数将新的子节点挂载到容器上
					mount(nextChildren, container)
					break
				case ChildrenFlags.NO_CHILDREN:
					// 新的 children 没有子节点  什么都不做
					break
				default:
					// 新的 children 有多个子节点
					// 遍历新的多个子节点，逐个挂载到容器上
					for (let i = 0; i < nextChildren.length; i++) {
						mount(nextChildren[i], container)
					}
					break
			}
			break
		// 旧的 children 有多个子节点
		default: 
			break
			switch(nextChildFlags) {
				case ChildrenFlags.SINGLE_VNODE: 
					// 新的 children 也是单个子节点
					// 将旧的节点全都移除，再添加新节点
					for (let i = 0; i < prevChildren.length; i++) {
						container.removeChild(prevChildren[i].el)
					}
					mount(nextChildren, container)
					break
				case ChildrenFlags.NO_CHILDREN:
					// 新的 children 没有子节点
					for (let i = 0; i < prevChildren.length; i++) {
						container.removeChild(prevChildren[i].el)
					}
					break
				default:
					// 新的 children 有多个子节点
					// 简单写法，将旧的 children 都移除，然后遍历将新的children逐个挂载
					for (let i = 0; i < prevChildren.length; i++) {
						container.removeChild(prevChildren[i].el)
					}
					for (let k = 0; k < nextChildren.length; k++) {
						mount(nextChildren[k], container)
					}

					// 尽可能复用子节点，待续······
					break
			}
			break
	}
}

// patchText
function patchText(prevVNode, nextVNode) {
	// 拿到文本元素el, 同时让 nextVNode.el 指向该文本元素
	const el = (nextVNode.el = prevVNode.el)
	// 只有当新旧文本内容不一致时才有必要更新
	if (nextVNode.children !== prevVNode.children) {
		el.nodeValue = nextVNode.children
	}
}

// 更新Fragment
// 如果两个 VNode 的类型都是片段，则 patch 函数会调用 patchFragment 函数更新片段的内容。
// 实际上片段的更新是简化版的标签元素的更新，我们知道对于标签元素来说更新的过程分为两个步骤：首先需要更新标签本身的 VNodeData，其次更新其子节点。
// 然而由于 Fragment 没有包裹元素，只有子节点，所以我们对 Fragment 的更新本质上就是更新两个片段的“子节点”。
function patchFragment(prevVNode, nextVNode, container) {
	// 直接调用 patchChildren 函数更新 新旧节点的子节点即可
	patchChildren(
		prevVNode.childFlags, 
		nextVNode.childFlags,
		prevVNode.children,
		nextVNode.children,
		container
	)

	// 如上高亮代码所示，我们通过检查新的片段的 children 类型，如果新的片段的 children 类型是单个子节点，则意味着其 vnode.children 属性的值就是 VNode 对象，
	// 所以直接将 nextVNode.children.el 赋值给 nextVNode.el 即可。如果新的片段没有子节点，我们知道对于没有子节点的片段我们会使用一个空的文本节点占位，
	// 而 prevVNode.el 属性引用的就是该空文本节点，所以我们直接通过旧片段的 prevVNode.el 拿到该空文本元素并赋值给新片段的 nextVNode.el 即可。
	// 如果新的片段的类型是多个子节点，则 nextVNode.children 是一个 VNode 数组，我们会让新片段的 nextVNode.el 属性引用数组中的第一个元素。
	// 实际上这段逻辑与我们在 mountFragment 函数中所实现的逻辑是一致的。
	switch (nextVNode.childFlags) {
		case ChildrenFlags.SINGLE_VNODE:
			nextVNode.el = nextVNode.children.el
			break
		case ChildrenFlags.NO_CHILDREN:
			nextVNode.el = prevVNode.el
			break
		default:
			nextVNode.el = nextVNode.children[0].el
	}
}