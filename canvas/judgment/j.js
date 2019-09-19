class Judgment{
    constructor(opt = {}){
        this.el = opt.el;
        this.ctx = this.el.getContext('2d');
        this.width = opt.width || 0;
        this.height = opt.height || 0;
        this.parentNode = this.el.parentNode;
        this.shapes = {};
        this.activeColor = '00ffff'; // 鼠标移上去或者选中状态下，高亮显示颜色
        this.init();
    }
    init(){
        if(!this.width){
            this.width = parseInt(this.getStyle(this.parentNode, 'width'));
        }
        if(!this.height){
            this.height = parseInt(this.getStyle(this.parentNode, 'height'));
        }
        this.el.width = this.width;
        this.el.height = this.height;
        this.createUpper();
        this.bindEvent();
    }
    bindEvent(){
        this.el.addEventListener('click', (e) => {
            this.judgment(e.layerX, e.layerY);
        });
        // this.el.addEventListener('mousemove', (e) => {
        //     this.judgment(e.layerX, e.layerY);
        // })
    }
    drawRect(opt){
        let {left, top, w, h} = opt;
        let c = this.getColor();
        this.ctx.strokeStyle = `#${c}`;
        this.ctx.rect(left, top, w, h);
        this.ctx.stroke();
        this.shapes[c] = {
            type: 'rect',
            color: c,
            size: {
                left: left, top: top, w: w, h: h
            },
            info: '矩形'
        }
    }
    drawLine(points){
        let one, n = 1, last;
        one = points[0];
        last = points[points.length - 1];
        if(one[0] !== last[0] || last[1] !== last[1]){
            // 不规则图形未闭合，主动闭合
            points.push([one[0], one[1]]);
        }
        let c = this.getColor();
        this.ctx.strokeStyle = `#${c}`;
        this.ctx.beginPath();
        this.ctx.moveTo(one[0], one[1]);
        while(n < points.length){
            this.ctx.lineTo(points[n][0], points[n][1]);
            n++;
        }
        this.ctx.stroke();
        this.ctx.closePath();
        this.drawUpperLine(points, c);
        this.shapes[c] = {
            type: 'shape',
            color: c,
            points: points,
            size: null,
            info: '不规则图形'
        }
    }
    drawActiveLine(points, c){
        let n = 1;
        this.ctx.strokeStyle = `#${c}`;
        this.ctx.beginPath();
        this.ctx.moveTo(points[0][0], points[0][1]);
        while(n < points.length){
            this.ctx.lineTo(points[n][0], points[n][1]);
            n++;
        }
        this.ctx.stroke();
        this.ctx.closePath();
    }
    drawUpperLine(points, c){
        let n = 1;
        this.upperCtx.fillStyle = `#${c}`;
        this.upperCtx.beginPath();
        this.upperCtx.moveTo(points[0][0] + 0.5, points[0][1] + 0.5);
        while(n < points.length){
            this.upperCtx.lineTo(points[n][0] + 0.5, points[n][1] + 0.5);
            n++;
        }
        this.upperCtx.fill();
        this.upperCtx.closePath();
    }
    createUpper(){
        let upper = document.createElement('canvas');
        upper.className = 'upper-canvas';
        upper.width = this.width;
        upper.height = this.height;
        upper.style = `position: absolute; left: 0; top: 0; opacity: 0; z-index: -1;`;
        this.upper = upper;
        this.upperCtx = this.upper.getContext('2d');
        this.parentNode.appendChild(upper);
    }
    getUpperData(x, y){
        let data = this.upperCtx.getImageData(x, y, 1, 1).data;
        return data;
    }
    judgment(x, y){
        /** 
         * @param c Unit8ClampedArray(4) rgba值，a值要除255得到0到1之间的小数
        */
        let S = '', a = [];
        let c = this.getUpperData(x, y);
        for(let i = 0; i < 3; i++){
            if(c[i] < 10){
                a[i] = '0' + c[i];
            }else{
                a[i] = c[i].toString(16) + '';
            }
        }
        S = a.join('');
        if(this.shapes[S]){
            let shape = this.shapes[S];
            let type = shape.type;
            if(type === 'shape'){
                this.drawActiveLine(shape.points, this.activeColor);
            }
            console.log(this.shapes[S]);
        }else{
            console.log('out');
        }
    }
    getColor(){
        let str = '0123456789abcdef';
        let n = 6, S = '', i = 0;
        for(; i < n; i++){
            S += str[this.getRandom(15, 0, true)];
        }
        return S;
    }
    getRandom(max, min, isInteger){
        let v;
        v = Math.random() * (max - min) + min;
        if(isInteger){
            return Math.floor(v);
        }
        return v;
    }
    getStyle(el, attr){
        if(window.getComputedStyle){
            this.getStyle = (el, attr) => {
                return window.getComputedStyle(el)[attr];
            }
        }else{
            this.getStyle = (el, attr) => {
                return el.currentStyle[attr];
            }
        }
    }
}