import './index.css'
class CreateCanvas{
	constructor(options = {}) {
		this.background = options.background || '#e5e5e5'
		this.color = options.color || '#000'
		this.width = options.width || 100
		this.height = options.height || 100
		this.deviation = options.deviation || 10
		this.line = options.line || '#000'
		this.init()

	}
	init() {
		this.createCanvas()
	}
	createCanvas() {
		let el = document.createElement('canvas')
		el.width = this.width
		el.height = this.height
		el.style = `background: ${this.background}`

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
		this.ctx.lineWidth = 2
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
	}
}

let els = Array.from('0'.repeat(5), el => {
	let points = new Array(4)
	points[0] = {x: 10, y: 90}
	points[3] = {x: 90, y: 10}
	return {
		options: {},
		points
	}
})
let control = [
	[25, 85, 25, 10], 
	[10, 90, 90, 10], 
	[40, 90, 90, 10], 
	[10, 90, 60, 10], 
	[40, 90, 60, 10]
]
control.forEach((element, i) => {
	els[i].points[1] = {x: element[0], y: element[1]}
	els[i].points[2] = {x: element[2], y: element[3]}
});
els[0].options = {
	background: 'aqua',
	color: '#fff',
	// line: '#fff'
}
els.map(el => {
	let ele = new CreateCanvas(el.options)
	document.body.appendChild(ele.el)
	ele.renderLine(el.points)
})
