class ScreenShot{
	constructor() {
		this.width = 200
		this.height = 150
		this.toolLists = [
			{n: 'rect',    i: '矩形工具'}, 
			{n: 'ellipse', i: '椭圆工具'}, 
			{n: 'cancel',  i: '退出截图'}, 
			{n: 'load',    t: '完成', i: '完成截图'}
		]
		this.init()
		
	}
	init() {
		let el = this.createElement('div')
		el.className = 'screen-shoot-box'
		el.style = this.Elstyle = `position: fixed;
		left: 50%;
		top: 50%;
		width: ${this.width}px;
		height: ${this.height}px;
		background: none;
		outline: #99999950 solid 9999px;
		border: 1px solid #6cf;
		cursor: move;
		z-index: 2;
		will-change: transform;`
		let mask = this.createElement('div')
		mask.className = 'screen-shoot-mask'
		mask.style = `position: fixed; left: 0; top: 0; right: 0; bottom: 0; opacity: 0; z-index: 1;`

		this.el = el
		
		this.mask = mask // 遮罩，防止截图时触发页面操作
		this.bindOperator()
		// this.startCapture()		
	}
	bindOperator() {
		document.addEventListener('keydown', e => {
			if (e.ctrlKey && e.keyCode === 90) {
				this.startCapture()
			}
		})
	}
	startCapture() {
		this.addElement(this.el)
		this.addElement(this.mask)
		this.addEvent()
		this.toolList() // 添加工具栏
	}
	endCapture() {
		this.removeElement(this.el)
		this.removeElement(this.mask)
	}
	toolList() {
		// 添加工具栏
		let tool = this.createElement('ul')
		tool.className = 'tool-list'
		tool.innerHTML = this.toolLists.map(n => `<li class="${n.n} item" title="${n.i}">${n.t || ''}</li>`).join('')
		this.el.appendChild(tool)
		this.tool = tool
	}
	initCanvas() {
		let el = this.createElement('canvas')
		this.canvas = el
		el.width = this.width
		el.height = this.height
		this.ctx = this.el.getContext('2d')
		
	}
	startLoad() {
		// 完成，开始下载

	}
	cancelScreenShot() {
		// 取消截图

	}
	drawRect() {
		// 绘制矩形

	}
	drawEllipse() {
		// 绘制椭圆

	}
	addEvent() {
		// 拖拽
		let x, y, a, b, X = 0, Y = 0, isCanMove
		this.el.addEventListener('mousedown', e => {
            isCanMove = true
            x = e.x
            y = e.y
        })
        document.addEventListener('mousemove', this.debounce(60, (e) => {
			if (!isCanMove) return
            a = X + e.x - x
			b = Y + e.y - y
            this.el.style = this.Elstyle + `transform: translate(${a}px, ${b}px)`;
        }))
        document.addEventListener('mouseup', e => {
            isCanMove = false
            X = a
            Y = b
		})
		
		this.containerResize()
	}
	containerResize() {
		// 弹窗拉伸
		// 从左上角开始
		let points = ['nw-resize', 'n-resize', 'ne-resize', 'e-resize', 'se-resize', 's-resize', 'sw-resize', 'w-resize']
		let frag = document.createDocumentFragment()
		let x, y, x1, y1, w = this.width, h = this.height, w1, y1, val, isCanResize 
		points.map(p => {
			let el = this.createElement('span')
			el.classList = 'point ' + p
			el.style.cursor = p
			el.addEventListener('mousedown', e => {
				e.stopPropagation() // 阻止冒泡
				x = e.clientX
				y = e.clientY
				isCanResize = true
				val = p
			})
			frag.appendChild(el)
		})
		this.el.appendChild(frag)

		document.addEventListener('mousemove', e => {
			if (isCanResize) {
				x1 = e.clientX - x
				y1 = e.clientY - y
				if (val === 'resize') {
					// 左上角
				}
				if (val === 'n-resize') {
					// 上正中
				}
				if (val === 'n-resize') {
					// 右上角
					// w1 = w 
				}
				if (val === 'e-resize') {
					// 右中
					
				}
				if (val === 'se-resize') {
					// 右下角
				}
				if (val === 's-resize') {
					// 下中
				}
				if (val === 'sw-resize') {
					// 左下角
				}
				if (val === 'w-resize') {
					// 左中
				}
			}
		})
		document.addEventListener('mousedown', e => {
			isCanResize = false
		})
	}
	debounce(time, fn) {
		let t = Date.now()
		return (e) => {
			if (Date.now() - t < time) return
			fn(e)
			t = Date.now()
		}    
	}
	createElement(name) {
		return document.createElement(name)
	}
	addElement(el) {
		document.body.appendChild(el)
	}
	removeElement(el) {
		document.body.removeChild(el)
	}
}