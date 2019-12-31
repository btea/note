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
let names = ['ease', 'linear', 'ease-in', 'ease-out', 'ease-in-out'], red, blue
let activeFun = 'ease'
control.forEach((element, i) => {
	els[i].options.name = names[i]
	els[i].options.background = 'none'
	els[i].points[1] = {x: element[0], y: element[1]}
	els[i].points[2] = {x: element[2], y: element[3]}
});
els[0].options = {
	background: 'none',
	color: '#fff',
	line: '#fff'
}
let handler = (ins, i) => {
	let el = ins.el
	if (el.classList.contains('active')) {
		return
	} else {
		els.map((e, j) => {
			if (e.el.el.classList.contains('active')) {
				e.el.el.classList.remove('active')
				removeActive(els[j])
			}
		})
		el.classList.add('active')
		addActive(els[i])
		curveFn(names[i])
	}
}

// 右侧取消当前选中活跃样式
function removeActive(ins) {
	ins.el.ctx.clearRect(0, 0, ins.width, ins.height)
	ins.el.color = ins.el.line = '#000'
	ins.el.renderLine(ins.points)
}
// 右侧渲染选中样式
function addActive(ins) {
	ins.el.ctx.clearRect(0, 0, ins.width, ins.height)
	ins.el.color = ins.el.line = '#fff'
	ins.el.renderLine(ins.points)

	blue.ctx.clearRect(0, 0, blue.width, blue.height)
	blue.renderLine(ins.points.map(p => ({x: p.x / (10 / 6), y: p.y / (10 / 6)})))
}
els.map((el, i) => {
	let ele = new CreateCanvas(el.options)
	let box = document.createElement('div')
	box.classList = 'library-item'
	box.appendChild(ele.el)
	box.setAttribute('data-name', names[i])
	document.querySelector('#library').appendChild(box)
	ele.renderLine(el.points)
	el.el = ele
	if (i === 0) {
		ele.el.classList.add('active')
	}
	ele.el.addEventListener('click', () => {
		handler(ele, i)
	})
})

let curve = new CreateCanvas({
	width: 300, height: 600, background: 'none', lineWidth: 7
})
curve.init = {
	x: 0, y: 600 * 25 + 150
}
let control1, control2, init = {one: {left: 50, top: 350, x: 80,y: 350}, two: {left: 250, top: 250, x: 280, y: 250}}
let ax = document.getElementById('p1x')
let ay = document.getElementById('p1y')
let bx = document.getElementById('p2x')
let by = document.getElementById('p2y')
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
// 过渡时间调整设置
const getEle = name => document.getElementsByClassName(name)[0]
let initTime = 1
let bar = getEle('bar')
let barContent = getEle('bar-content')
let timePoint = getEle('time-point')
let timeEl = getEle('desc-time')
let operator = getEle('operator')
let play = getEle('start-play')
// 预览 & 比较 canvas绘制
red = new CreateCanvas({
	width: 60,
	height: 60,
	color: '#fff',
	line: '#fff',
	background: 'red'
})
red.el.className = 'show'
operator.appendChild(red.el)
red.renderLine(points.map(p => ({x: p.x / 6 + 5, y: (p.y - 150) / 6 + 5})))

blue = new CreateCanvas({
	width: 60,
	height: 60,
	color: '#fff',
	line: '#fff',
	background: 'rgb(0, 170, 187)'
});
blue.el.className = 'show'
operator.appendChild(blue.el)
blue.renderLine(els[0].points.map(p => ({x: p.x / (10 / 6), y: p.y / (10 / 6)})))


// 应用默认曲线函数
function curveFn(name) {
	blue.el.style = `transition-timing-function: ${name}; transition-duration: ${initTime}s;background: ${blue.background}`
}

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
		let cubic = bezierFun(points[1], points[2])
		titleIconSet(cubic)
		timeFunction(red.el, points)
		red.ctx.clearRect(0, 0, red.width, red.height)
		red.renderLine(points.map(p => ({x: p.x / 6 + 5, y: (p.y - 150) / 6 + 5})))
	}
})
function titleIconSet(title) {
	title = `cubic-bezier(${title})`
	let icon = red.el.toDataURL('image/png')
	let img = document.createElement('img')
	img.src = icon
	let titleEl = document.getElementsByTagName('title')[0]
	let iconEl = document.getElementsByTagName('link')[0]
	titleEl.innerText = title
	img.onload = () => {
		let canvas = document.createElement('canvas')
		canvas.width = 60
		canvas.height = 60
		let ctx = canvas.getContext('2d')
		ctx.beginPath()
		ctx.fillStyle = '#6cf';
		ctx.rect(0, 0, 60, 60)
		ctx.fill()
		ctx.drawImage(img, 5, 5, 50, 50)
		iconEl.href = canvas.toDataURL('image/png')
	}
}

document.addEventListener('mouseup', e => {
	isCanMove = false
})


function bezierFun(one, two) {
	let a, b, c, d
	a = numConvert(one.x / 300)
	b = numConvert((450 - one.y) / 300)
	c = numConvert(two.x / 300)
	d = numConvert((450 - two.y) / 300)
	codeValue(a, b, c, d)
	return `${a}, ${b}, ${c}, ${d}`
}

function codeValue(a, b, c, d){
	ax.innerText = a
	ay.innerText = b
	bx.innerText = c
	by.innerText = d
}
function numConvert(n) {
	if (!Number(n)) return 0
	if (!/\./.test(n)) return n
	n = n.toFixed(2)
	if (/0$/.test(n)) return n.slice(0, -1)
	return n
}
// 曲线函数设置
function timeFunction(el, points, c = 'red') {
	let bezier = bezierFun(points[1], points[2])
	el.style = `transition-timing-function: cubic-bezier(${bezier}); transition-duration: ${initTime}s;background: ${c}`
}
bar.addEventListener('click', e => {
	let v = (e.layerX / 150).toFixed(3) * 100
	barContent.style = `width: ${v}%`
	initTime = Math.floor(v) / 100 * 10
	if (/\./.test(initTime)) {
		initTime = initTime.toFixed(1)
	}
	timeEl.innerText = `${initTime} 秒`
	timeFunction(red.el, points)

	curveFn(activeFun)
})
// 初始化时间设置
barContent.style = `width: 10%`
timeEl.innerText = `${initTime} 秒`
timeFunction(red.el, points)
curveFn(activeFun)
// 初始化页面标题和icon
let cubic = bezierFun(points[1], points[2])
titleIconSet(cubic)

play.addEventListener('click', e => {
	red.el.classList.toggle('move')
	blue.el.classList.toggle('move')
})
