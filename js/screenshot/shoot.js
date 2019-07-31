class Shoot{
    constructor(options){
        let el = options.el;
        if(typeof el === 'string'){
            el = document.querySelector(el);
        }
        if(el && el.style){
            this.element = el;
            this.w = options.w || parseInt(this.getStyle(this.element, 'width'));
            this.h = options.h || parseInt(this.getStyle(this.element, 'height'));
            this.width = options.width || 200;
            this.height = options.height || 150;
            this.left = options.left || this.w / 2;
            this.top = options.top || this.h / 2;
            this.init();
            console.log('%c ctrl+z开始截图', 'color:red');
            console.log('%c ctrl+c确定下载截图','color: aqua');
        }
    }
    init(){
        this.shortCutKeys();
    }
    // 截图快捷键设置
    shortCutKeys(){
        document.addEventListener('keyup', (e) => {
            if(e.ctrlKey && e.key === 'z'){
                this.startCropper();
            }
            if(e.ctrlKey && e.key === 'c'){
                this.getImage();
            }
            console.log(e);
        })
    }
    startCropper(){
        this.maskBox();   
        this.blackBox();
    }
    getStyle(el, attr){
        this.activeElement = el;
        if(this.elementStyle){
            return this.elementStyle[attr];
        }
        if(window.getComputedStyle){
            this.elementStyle = window.getComputedStyle(el, null);
        }else{
            this.elementStyle = el.currentStyle();
        }
        return this.elementStyle[attr];
    }
    blackBox(){
        this.ctx.clearRect(0, 0, this.w, this.h);
        this.ctx.fillStyle = 'rgba(0, 0, 0, .5)';
        this.ctx.rect(0, 0, this.w, this.h);
        this.ctx.fillRect(0, 0, this.w, this.h);
        this.whiteBox();
    }
    whiteBox(){
        this.ctx.clearRect(this.left, this.top, this.width, this.height);
    }
    maskBox(){
        if(!this.maskElement){
            this.maskElement = this.createMask();
            this.ctx = this.maskElement.getContext('2d');
            this.containerElement = this.createContainer();
        }
        this.maskElement.appendChild(this.containerElement);
        document.body.appendChild(this.maskElement);
    }
    createMask(){
        let mask = document.createElement('canvas');
        mask.style.position = 'absolute';
        mask.style.left = '0';
        mask.style.top = '0';
        mask.width = this.w;
        mask.height = this.h;
        // mask.style.background = 'rgba(0, 0, 0, .5)';
        mask.style.zIndex = '1';
        return mask;
    }
    createContainer(){
        let container = document.createElement('div'), css;
        css = `width: ${this.width || 150}px;
        height: ${this.height || 80}px; 
        background: #fff; 
        position: absolute; 
        left: 50%; 
        top: 50%;`
        container.style.cssText = css;
        return container;
    }
    getImage(){
        let node = document.body;
        domtoimage.toPng(node).then(url => {
            let ctx = this.createCnavas(this.w, this.h).getContext('2d');
            let img = new Image();
            img.src = url;
            img.onload = () => {
                ctx.drawImage(img, 0, 0);
                let data = ctx.getImageData(this.left, this.top, this.width, this.height);
                let c = this.createCnavas(this.width, this.height);
                let ct = c.getContext('2d');
                ct.putImageData(data, 0, 0);
                this.downloadCanvas(c);
            }
        })
    }
    createCnavas(w, h){
        let c = document.createElement('canvas'), ctx;
        c.width = w;
        c.height = h;
        return c;
    }
    downloadCanvas(canvas){
        let url = canvas.toDataURL();
        let a = document.createElement('a');
        a.href = url;
        a.download = +new Date() + '.png';
        a.click();
    }
}