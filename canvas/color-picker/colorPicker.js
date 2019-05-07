const c = console.log;
class ColorPicker{
    constructor(options){
        this.width = options.width || 300;
        this.height= options.height || 200;
        this.initElement();
    }
    initElement(){
        const canvas = document.createElement('canvas');
        canvas.width = this.width;
        canvas.height = this.height;
        this.canvas = canvas;
        document.body.appendChild(canvas);
        const ctx = this.canvas.getContext('2d');
        const grad = ctx.createLinearGradient(0,0,this.width, this.height);
        // linear-gradient(180deg,red 0,#ff0 17%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,red)
        grad.addColorStop(0, '#6cf');
        grad.addColorStop(1, 'aqua');
        ctx.rect(0,0,this.width,this.height);
        ctx.fillStyle = grad;
        ctx.fill();
        this.nodeEvent(this.canvas, this.positionCalc);
        
        this.showElement();
    }
    showElement(){
        const div = document.createElement('div');
        div.style = 'width: 100px; height: 50px;';
        document.body.appendChild(div);
        this.div = div;
    }
    nodeEvent(ele, fun){
        ele.addEventListener('click', (e) => {
            fun.call(this,e);
        })
    }
    positionCalc(e){
        const x = e.offsetX,
            y = e.offsetY
        ;
        let color = this.getPoint(x, y);
        c('rgba', color);
        let conversion = '#' + color[0].toString(16) + color[1].toString(16) + color[2].toString(16);
        c('16进制', conversion);

        this.div.style.background = conversion;
    }
    getPoint(x, y){
        const data = this.canvas.getContext('2d').getImageData(0, 0, this.width, this.height).data;
        const n = x + this.width * (y - 1);
        const p = 4 * (n - 1);
        return [data[p], data[p + 1], data[p + 2], data[p + 3]];
    }
}