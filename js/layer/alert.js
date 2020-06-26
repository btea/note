const colors = {
    success: 'green',
    error: 'red',
    init: 'gray',
    color: '#fff'
}
class Alert{
    constructor(opt) {
        /**
         * @params opt 参数集合
         * @params Number opt.time 弹窗显示的时间，默认为3秒
         * 
        */
        this.time = opt.time || 3000
        this.duration = '.8s'  // 动画过渡时间
        this.background = opt.background || 'init'  // 弹窗背景颜色
        this.color = opt.color || 'color'  // 弹窗文字颜色
        this.text = opt.text
        this.deviation = opt.deviation || 10 // 弹窗出现或者消失时偏移的距离
        this.el = this.createEl()
        this.elementStyle(this.el)
        this.el.innerText = this.text
        this.addLayer()
        setTimeout(() => {
            this.removeLayer()
        }, this.time + 200)
    }
    createEl(tag) {
        return document.createElement(tag || 'div')
    }
    addLayer() {
        document.body.appendChild(this.el)
        setTimeout(() => {
            this.el.style.marginTop = '0'
            this.el.style.opacity = 1
        }, 100)
    }
    removeLayer() {
        let style = this.el.style
        style.marginTop = `${this.deviation}px`
        style.opacity = 0
        let t = parseFloat(this.duration) * 1000 + 200
        setTimeout(() => {
            document.body.removeChild(this.el)
        }, t)
    }
    elementStyle(el) {
        el.style.position = 'absolute';
        el.style.left = '50%';
        el.style.top = '50%';
        el.style.padding = '5px 10px';
        el.style.zIndex = 1000;
        el.style.transform = 'translate(-50%, -50%)';
        el.style.borderRadius = '3px';
        el.style.opacity = 0
        el.style.color = colors[this.color]
        el.style.marginTop = `${this.deviation}px`;
        el.style.transition = `all ${this.duration}`;
        el.style.color = colors[this.color];
        el.style.background = this.background;
    }
}