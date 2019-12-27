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
let control1, control2, init = {one: {left: 50, top: 350, x: 80,y: 350}, two: {left: 250, top: 250, x: 280, y: 250}}
control1 = document.getElementsByClassName('control1')[0]
control2 = document.getElementsByClassName('control2')[0]
const pointMove = (el, point) => {
	el.style = `left: ${point.x}px; top: ${point.y}px;`
	// el.style = `transform: translateX(${point.x}px) translateY(${point.y})px;`
}
let isCanMove = false, activeEl, points = [{x: 0, y: 450}, {x: 50, y: 350}, {x: 250, y: 250}, {x: 300, y: 150}], X, Y
const moveHandler = (el) => {
	el.addEventListener('mousedown', e => {
		isCanMove = true
		activeEl = e.target
	})
}
moveHandler(control1)
moveHandler(control2)
curve.renderAxis()

document.getElementsByClassName('coordinate-plane')[0].appendChild(curve.el)
pointMove(control1, {x: 50, y: 350})
pointMove(control2, {x: 250, y: 250})
curve.renderLine([{x: 0, y: 450}, {x: 50, y: 350}, {x: 250, y: 250}, {x: 300, y: 150}])

document.addEventListener('mousemove', e => {
	if (isCanMove) {
		let x, y, a, b, left, top, vx, vy
		x = e.x
		y = e.y
		if (activeEl === control1) {
			a = x - init.one.x
			b = y - init.one.y
			left = init.one.left
			top = init.one.top
			vx = left + a
			vy = top + b
			if (vx <= 0) { vx = 0}
			if (vx >= 300) {vx = 300}
			points[1] = {x: vx, y: vy}
		} else {
			a = x - init.two.x
			b = y - init.two.y
			left = init.two.left
			top = init.two.top
			vx = left + a
			vy = top + b
			if (vx <= 0) { vx = 0}
			if (vx >= 300) {vx = 300}
			points[2] = {x: vx, y: vy}
		}
		curve.ctx.clearRect(0, 0, curve.width, curve.height)
		curve.renderAxis()
		curve.renderLine(points)
		activeEl.style = `left: ${vx}px; top: ${vy}px`
	}
})
document.addEventListener('mouseup', e => {
	isCanMove = false
})

// 过渡时间调整设置
const getEle = name => document.getElementsByClassName(name)[0]
let initTime = 0
let bar = getEle('bar')
let barContent = getEle('bar-content')
let timeEl = getEle('desc-time')
let operator = getEle('operator')
let play = getEle('start-play')
// 预览 & 比较 canvas绘制
let left = new CreateCanvas({
	width: 60,
	height: 60,
	color: '#fff',
	line: '#fff',
	background: 'red'
})
left.el.className = 'show'
operator.appendChild(left.el)
left.renderLine(points.map(p => ({x: p.x / 6 + 5, y: (p.y - 150) / 6 + 5})))
function bezierFun(one, two) {
	let a, b, c, d
	a = numConvert((one.x / 300).toFixed(2))
	b = numConvert(((one.y - 450) / 300).toFixed(2))
	c = numConvert((two.x / 300).toFixed(2))
	d = numConvert(((two.y - 450) / 300).toFixed(2))
	return `${a}, ${b}, ${c}, ${d}`
}
function numConvert(n) {
	if (!Number(n)) return 0
	if (/0$/.test(n)) return n.slice(-1)
	return n
}
// 曲线函数设置
function timeFunction(el, points, c = 'red') {
	let bezier = this.bezierFun(points[1], points[2])
	el.style = `transition-timing-function: cubic-bezier(${bezier}); transition-duration: ${initTime}s;background: ${c}`
}
bar.addEventListener('click', e => {
	let v = (e.layerX / 150).toFixed(3) * 100
	if (v < 1 / 15 * 100) {
		v = 1 / 15 * 100
	}
	barContent.style = `width: ${v}%;`
	initTime = Math.floor(v) / 100 * 10
	if (/\./.test(initTime)) {
		initTime = initTime.toFixed(1)
	}
	timeEl.innerText = `${initTime} 秒`
	
})
play.addEventListener('click', e => {
	left.el.classList.toggle('move')
})




