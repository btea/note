export class CreateCanvas{
	constructor(options = {}) {
		this.background = options.background || '#e5e5e5'
		this.color = options.color || '#000'
		this.width = options.width || 100
		this.height = options.height || 100
		this.deviation = options.deviation || 10
		this.line = options.line || '#000'
		this.name = options.name || ''
		this.lineWidth = options.lineWidth
		this.init()

	}
	init() {
		this.createCanvas()
	}
	createCanvas() {
		let el = document.createElement('canvas')
		el.width = this.width
		el.height = this.height
		let str = `width: ${this.width}px; height: ${this.height}px;`
		if (this.background !== 'none') {
			str += `background: ${this.background};`
		}
		el.style = str
		let ctx = el.getContext('2d')
		this.el = el
		this.ctx = ctx
	}
	renderLine(points) {
		/**
		 * @params points Array
		 * @params points[0] 起始点  points[1] 控制点1  points[2] 控制点2  points[3] 终点
		*/
		this.ctx.beginPath()
		this.ctx.strokeStyle = this.color
		this.ctx.lineWidth = this.lineWidth || 2
		this.ctx.moveTo(points[0].x, points[0].y)
		this.ctx.bezierCurveTo(points[1].x, points[1].y, points[2].x, points[2].y, points[3].x, points[3].y)
		this.ctx.stroke()
		this.ctx.beginPath()
		this.ctx.lineWidth = 0.5
		this.ctx.strokeStyle = this.line
		this.ctx.moveTo(points[0].x, points[0].y)
		this.ctx.lineTo(points[1].x, points[1].y)
		this.ctx.stroke()
		this.ctx.beginPath()
		this.ctx.strokeStyle = this.line
		this.ctx.moveTo(points[2].x, points[2].y)
		this.ctx.lineTo(points[3].x, points[3].y)
		this.ctx.stroke()
		
		points.slice(1, -1).forEach(p => {
			this.renderCircle(p)
		})
	}
	renderAxis() {
		this.ctx.beginPath()
		this.ctx.strokeStyle = '#000'
		this.ctx.moveTo(0 + 0.5, 150 + 0.5)
		this.ctx.lineTo(0 + 0.5, 450 + 0.5)
		this.ctx.lineTo(300 + 0.5, 450 + 0.5)
		this.ctx.stroke()
	}
	renderCircle(points) {
		this.ctx.beginPath()
		this.ctx.fillStyle = this.line
		this.ctx.arc(points.x, points.y, 1, 0, Math.PI * 2)
		this.ctx.fill()
	}
}