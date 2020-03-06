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
		this.getContainerStyle()

		el.className = 'screen-shoot-box'
		this.Elstyle = `position: fixed;
		background: none;
		outline: #99999950 solid 9999px;
		border: 1px solid #6cf;
		cursor: move;
		z-index: 2;
		will-change: transform;`
		el.style = this.Elstyle + `width: ${this.width}px;height: ${this.height}px; left: ${this.left}px; top: ${this.top}px;`
		let mask = this.createElement('div')
		mask.className = 'screen-shoot-mask'
		mask.style = `position: fixed; left: 0; top: 0; right: 0; bottom: 0; opacity: 0; z-index: 1;`

		this.el = el
		
		this.mask = mask // 遮罩，防止截图时触发页面操作
		this.bindOperator()
		this.startCapture()
	}
	getContainerStyle() {
		// let style = this.getElStyle(this.el)
		// this.left = parseInt(style.left)
		// this.top = parseInt(style.top)
		let w, h
		w = window.innerWidth
		h = window.innerHeight
		this.left = (w - this.width) / 2
		this.top = (h - this.height) / 2
	}
	getElStyle(el, pseudo = null) {
		if (window.getComputedStyle) {
			return window.getComputedStyle(el, pseudo)
		} 
		return el.currentStyle
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
		tool.innerHTML = this.toolLists.map(n => {
			let html = `<li class="${n.n} item" title="${n.i}">${n.t || ''}</li>`
			return html
		}).join('')
		this.el.appendChild(tool)
		this.tool = tool
		
		let child = tool.children
		child[3].addEventListener('click', this.startLoad)
		child[2].addEventListener('click', () => { this.cancelScreenShot() })
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
		let node = document.getElementsByClassName('container')[0];
        domtoimage.toPng(node).then(url => {
            let con = document.getElementsByClassName('screen-shoot-box')[0]
            let info = con.getBoundingClientRect()
            let w = window.innerWidth
            let h = window.innerHeight
            let el = document.createElement('canvas')
            el.width = info.width
            el.height = info.height
            let ctx = el.getContext('2d')
			let img = new Image()
			/**
			 * ctx.drawImage(iamge, sx, sy, swidth, sheight, dx, dy, dwidth, dheight)
			 * @params image 绘制到上下文的图片元素  
			 * @params sx 需要绘制到目标上下文中的，image的矩形（裁剪）选择框的左上角X轴坐标
			 * @params sy 需要绘制到目标上下文中的，image的矩形（裁剪）选择框的左上角Y轴坐标  
			 * @params swidth 需要绘制到目标上下文中的，iamge的矩形（裁剪）选择框的宽度。如果不说明，整个矩形（裁剪）从坐标的sx和sy开始，一直到image的右下角为止
			 * @params sheight                                                 高度
			 * @params dx image的左上角在目标canvas上X轴坐标 
			 * @params dy image的左上角在目标canvas上y轴坐标 
			 * @params dwidth image在目标canvas上绘制的宽度。允许对绘制的image进行缩放。如果不说明，在绘制时image宽度不会缩放
			 * @params dheight                        高度
			 * 
			 * 语法 
			 * ctx.drawImage(image, dx, dy)
			 * ctx.drawImage(image, dx, dy, dwidth, dheight)
			 * ctx.drawImage(image, sx, sy, swidth, sheight, dx, dy, dwidth, dheight) 
			 * 
			 * */
            img.onload = () => {
                ctx.drawImage(img, -info.left, -info.top - document.documentElement.scrollTop, w, h)
                let link = document.createElement('a')
                link.href = el.toDataURL()
                link.download = Date.now() + '.png'
                link.click()
            }
            img.src = url
        })
	}
	cancelScreenShot() {
		// 取消截图
		document.body.removeChild(this.el)
		document.body.removeChild(this.mask)
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
            this.el.style = this.Elstyle + `transform: translate(${a}px, ${b}px);width: ${this.width}px;height: ${this.height}px; left: ${this.left}px; top: ${this.top}px;`;
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
		let x, y, x1, y1, w = this.width, h = this.height, val, isCanResize, left = this.left, top = this.top, w1 = w, h1 = h, left1 = left, top1 = top 
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

		document.body.addEventListener('mousemove', e => {
			if (isCanResize) {
				e.stopPropagation()
				x1 = e.clientX - x
				y1 = e.clientY - y
				if (val === 'nw-resize') {
					// 左上角
					left1 = left + x1
					top1 = top + y1
					w1 = w - x1
					h1 = h - y1
					this.el.style.left = `${left + x1}px`
					this.el.style.top = `${top + y1}px`
					this.el.style.width = `${w - x1}px`
					this.el.style.height = `${h - y1}px`
				}
				if (val === 'n-resize') {
					// 上正中
					top1 = top + y1
					h1 = h - y1
					this.el.style.top = `${top + y1}px`
					this.el.style.height = `${h - y1}px`
				}
				if (val === 'ne-resize') {
					// 右上角
					top1 = top + y1
					h1 = h - y1
					w1 = w + x1
					this.el.style.top = `${top + y1}px`
					this.el.style.height = `${h - y1}px`
					this.el.style.width = `${w + x1}px`
				}
				if (val === 'e-resize') {
					// 右中
					w1 = w + x1
					this.el.style.width = `${w + x1}px`
				}
				if (val === 'se-resize') {
					// 右下角
					w1 = w + x1
					h1 = h + y1
					this.el.style.width = `${w + x1}px`
					this.el.style.height = `${h + y1}px`
				}
				if (val === 's-resize') {
					// 下中
					h1 = h + y1
					this.el.style.height = `${h + y1}px`
				}
				if (val === 'sw-resize') {
					// 左下角
					left1 = left + x1
					w1 = w - x1
					h1 = h + y1
					this.el.style.left = `${left + x1}px`
					this.el.style.width = `${w - x1}px`
					this.el.style.height = `${h + y1}px`
				}
				if (val === 'w-resize') {
					// 左中
					w1 = w - x1
					left1 = left + x1
					this.el.style.width = `${w - x1}px`
					this.el.style.left = `${left + x1}px`
				}
			}
		})
		document.body.addEventListener('mouseup', e => {
			if (isCanResize) {
				e.stopPropagation()  // 阻止冒泡，防止触发document上绑定的拖拽元素框相关事件
				isCanResize = false
				w = this.width = w1;
				h = this.height = h1;
				left = this.left = left1;
				top = this.top = top1;
			}
			
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