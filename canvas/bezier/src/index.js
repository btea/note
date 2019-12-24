class createCanvas{
	constructor(options) {
		this.background = options.background || '#e5e5e5'
		this.color = options.color || '#000'
		this.width = options.width || 100
		this.height = options.height || 100
		this.deviation = options.deviation || 10
		this.init()

	}
	init() {
		this.createCanvas()
	},
	createCanvas() {
		let el = document.createElement('canvas')
		el.width = this.width
		el.height = this.height
		el.style.background = this.background
		let ctx = el.getContext('2d')
		this.el = el
		this.ctx = ctx
	}
	renderLine(points) {
		
	}
}