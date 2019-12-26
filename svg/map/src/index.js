import data from '../data/map'

class DrawPath{
	constructor(el, opt = {}){
		this.el = this.getEl(el)
		this.getStyle(this.el)
		this.initSvg()
	}
	initSvg(){
		this.svg = this.createSvg('svg')
		this.svgOption(this.svg, {
			width: this.w || 800,
			height: this.h || 500
		})
		this.el.appendChild(this.svg)

		this.startCreate()
	}
	startCreate() {	
		let info = []
		let list = data.features || [];
		list.forEach(l => {
			let o = {
				pro: l.properties,
				pos: this.coordinatesDeal(l.geometry.coordinates),
				type: l.geometry.type
			}
			info.push(o)
		})
		let svgEle = []
		let w = this.lngMax - this.lngMin
		let h = this.latMax - this.latMin
		// let s = w / this.w
		// 自动适应宽高比，保证绘制的地图区域不会超出svg大小
		let s
		// if ( w > h) {
		// 	s = h / this.h
		// } else {
		// 	s = w / this.w
		// }
		s = w / this.w
		this.transformScale = s
		
		if (this.latMin < 0) {
			info.forEach(p => {
				let list = p.pos
				list.forEach(po => {
					let d = ''
					po.forEach(c => {
						// p.pos[0] = c[0] + Math.abs(this.lngMin)
						let x, y
						// if (this.lngMin < 0) {
							// x = c[0] + Math.abs(this.lngMin)
						// }
						x = c[0] - this.lngMin 
						// y = c[1] + Math.abs(this.latMin)
						y = c[1] - this.latMin
						
						d += `L${x / s} ${y /s + this.h / 2 - 100} `
					})
					d = d.replace('L', 'M')
					d += ' Z'
					svgEle.push(d)
				})
				
			})
		}
		svgEle.forEach((s, i) => {
			this.createPath('path', {
				d: s,
				fill: 'aqua',
				stroke: '#6cf',
				'stroke-width': 2,
				'fill-opacity': 0.5
			})
		})
		// this.createPath('path', {
		// 	d: 'M200 50 L210 65 L215 70 L230 55 L240 80 L200 100Z',
		// 	fill: 'yellow',
		// 	// stroke: '',
			
		// })
	}
	latLngToPixel(lngLat) {
		let x, y, re 
		re = this.benchmark
		x = Math.floor((lngLat[0] - re[0]) * this.scale) + Math.abs(this.lngMin)
		y = Math.floor((re[1] - lngLat[1]) * this.scale) + Math.abs(this.latMin)
		x = x / this.transformScale
		y = y / this.transformScale
		return {x, y}
	}
	pixelToLatlng(pixel) {
		let {x, y} = pixel
		let re = this.benchmark
		x *= this.transformScale
		y *= this.transformScale

		x -= Math.abs(this.lngMin)
		y -= Math.abs(this.latMin)

		x /= this.scale
		y /= this.scale
		
		x = x + re[0]
		y = y - re[1]
		console.log(x, y)
	}
	coordinatesDeal(data) {
		// 经纬度处理，经纬度转换成实际像素位置
		// lng(经度) lat(纬度)  中国境内（一般经度大于纬度）
		if (!data) return []
		let scale = 1e5
		this.scale = scale
		let arr = []
		if (!this.benchmark) {
			let benchmark = data[0][0]
			this.benchmark = benchmark
			this.lngMin = this.lngMax = 0
			this.latMin = this.latMax = 0
		}
		data.forEach(line => {
			let a = []
			if (line.length === 1) {
				line = line[0]
			}
			line.forEach(v => {
				let lng = Math.floor((v[0] - this.benchmark[0]) * scale)
				let lat = Math.floor((this.benchmark[1] - v[1]) * scale)
				if (lng < this.lngMin) {
					this.lngMin = lng
				}
				if (lng > this.lngMax) {
					this.lngMax = lng
				}
				if (lat < this.latMin) {
					this.latMin = lat
				}
				if (lat > this.latMax) {
					this.latMax = lat
				}
				a.push([lng, lat])
			})
			arr.push(a)
		})
		this.latMax += 100
		this.latMin -= 100
		this.lngMax += 100
		this.lngMin -= 100
		return arr
	}
	createPath(name, opt = {}) {
		let el = this.createSvg(name)
		this.svgOption(el, opt)
		this.svg.appendChild(el)
	}
	getEl(el) {
		if(!el){return}
        if(el instanceof Element){
            return el;
        }
        if(typeof el === 'string'){
            return document.querySelector(el);
        }
        if(el[0] instanceof Element){
            return this.getEl(el[0]);
        }
        return void 0;
	}
	getStyle(el) {
		let w, h, sty
		if (window.getComputedStyle) {
			sty = window.getComputedStyle(el, null)
		} else {
			sty = el.currentStyle
		}
		w = parseInt(sty.width) || 100
		h = parseInt(sty.height) || 100
		this.w = w
		this.h = h
	}
	createSvg(name) {
		return document.createElementNS('http://www.w3.org/2000/svg', name)
	}
	svgOption(el, opt = {}) {
		Object.keys(opt).forEach(key => {
			el.setAttribute(key, opt[key])
		})
		if (el === this.svg) { return }
		let v = el.getAttribute('fill')
		el.addEventListener('mouseenter', (e) => {
			el.setAttribute('fill', 'red')
		})
		el.addEventListener('mouseleave', (e) => {
			el.setAttribute('fill', v)
		})
	}
}

let map = new DrawPath('#app')
let p = map.latLngToPixel([
	108.36508734920648,
	22.79567376085845
])
function createPoint(p) {
	let el = document.createElement('span')
	el.style = `width: 2px; height: 2px; border-radius: 50%; background: red; position: absolute; left: ${p.x}px; top: ${p.y}px;`
	map.el.appendChild(el)
}
createPoint(p)

map.el.addEventListener('click', (e) => {
	let x = e.offsetX;
	let y = e.offsetY;
	/***
	 * 误差太大，经纬度小数后三至四位开始出现误差
	 ***/
	console.log('像素', x, y)
	map.pixelToLatlng({x, y})
})
