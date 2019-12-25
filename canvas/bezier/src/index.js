import './index.css'
import {CreateCanvas} from './createCanvas'

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
let names = ['ease', 'linear', 'ease-in', 'ease-out', 'ease-in-out']
control.forEach((element, i) => {
	els[i].options.name = names[i]
	els[i].points[1] = {x: element[0], y: element[1]}
	els[i].points[2] = {x: element[2], y: element[3]}
});
els[0].options = {
	background: '#0ab',
	color: '#fff',
	line: '#fff'
}
let handler = (ins) => {
	let el = ins.el
	if (el.classList.contains('active')) {
		return
	} else {
		el.classList.add('active')
	}
}
els.map(el => {
	let ele = new CreateCanvas(el.options)
	document.querySelector('#library').appendChild(ele.el)
	ele.renderLine(el.points)
	el.el = ele
})

let curve = new CreateCanvas({
	width: 300, height: 600, background: 'none', lineWidth: 7
})
curve.init = {
	x: 0, y: 600 * 25 + 150
}
let control1, control2
control1 = document.getElementsByClassName('control1')[0]
control2 = document.getElementsByClassName('control2')[0]
const pointMove = (el, point) => {
	el.style = `left: ${point.x}px; top: ${point.y}px;`
}
let isCanMove = false, activeEl, points = [{x: 0, y: 450}, {x: 50, y: 350}, {x: 250, y: 250}, {x: 300, y: 150}]
const moveHandler = (el) => {
	el.addEventListener('mousedown', e => {
		isCanMove = true
		activeEl = e.target
	})
	el.addEventListener('mouseup', e => {
		isCanMove = false
	})
}
const drawAxis = () => {
	curve.ctx.beginPath()
	curve.ctx.strokeStyle = '#000'
	curve.ctx.moveTo(0 + 0.5, 150 + 0.5)
	curve.ctx.lineTo(0 + 0.5, 450 + 0.5)
	curve.ctx.lineTo(300 + 0.5, 450 + 0.5)
	curve.ctx.stroke()
}
moveHandler(control1)
moveHandler(control2)
drawAxis()
document.getElementsByClassName('coordinate-plane')[0].appendChild(curve.el)
pointMove(control1, {x: 50, y: 350})
pointMove(control2, {x: 250, y: 250})
curve.renderLine([{x: 0, y: 450}, {x: 50, y: 350}, {x: 250, y: 250}, {x: 300, y: 150}])
curve.el.addEventListener('mousemove', e => {
	let x, y, time
	x = e.offsetX
	y = e.offsetY
	if (isCanMove) {
		pointMove(activeEl, {x, y})
		curve.ctx.clearRect(0, 0, curve.width, curve.height)
		if (activeEl === control1) {
			points[1] = {x, y}
		} else {
			points[2] = {x, y}
		}
		drawAxis()
		curve.renderLine(points)
	}
	time = Math.floor(x / 300) + '%'
})

curve.el.addEventListener('mouseup', e => {
	isCanMove = false
})
document.addEventListener('mouseup', e => {
	isCanMove = false
})





