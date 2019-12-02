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
		// 自动适应宽高比，保证绘制的地图区域不会超出svg大小外
		let s
		if ( w > h) {
			s = h / this.h
		} else {
			s = w / this.w
		}
		this.transformScale = s
		if (this.latMin < 0) {
			info.forEach(p => {
				let list = p.pos
				list.forEach(po => {
					let d = ''
					po.forEach(c => {
						// p.pos[0] = c[0] + Math.abs(this.lngMin)
						let x, y
						if (this.lngMin < 0) {
							x = c[0] + Math.abs(this.lngMin) 
						}
						y = c[1] + Math.abs(this.latMin)
						d += `L${x / s} ${y / s} `
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
		this.createPath('path', {
			d: 'M200 50 L210 65 L215 70 L230 55 L240 80 L200 100Z',
			fill: 'yellow',
			// stroke: '',
			
		})
	}
	latLngToPixel(lngLat){
		let x, y, re 
		re = this.benchmark
		x = Math.floor((lngLat[0] - re[0]) * this.scale) + Math.abs(this.lngMin)
		y = Math.floor((re[1] - lngLat[1]) * this.scale) + Math.abs(this.latMin)
		x = x / this.transformScale
		y = y / this.transformScale
		console.log(x, y);
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
map.latLngToPixel([
	108.36508734920648,
	22.79567376085845
])
