
class dragElement{
    constructor(object){
        this.element = object.element || null;
        this.container = document.createElement('div');
        this.containerParent = this.element.parentNode;
        this.points = []; // 保存所有拖拽的点
        this.isMove = false; // 状态，用来判断当前是否可以拉伸
        this.isBoxMove = false; // 状态，拖动整个盒子
        this.initLeft = void 0; // 保存开始元素开始拖动时的默认位置
        this.initTop = void 0; 
        this.initElement();
        this.boxMove();
    }
    initElement(){
        if(!this.element){return;}
        let w = this.getStyle(this.element, 'width');
        let h = this.getStyle(this.element, 'height');
        let clone;
        w = parseInt(w);
        h = parseInt(h);
        this.w = w;
        this.h = h;
        this.boxW = parseInt(this.getStyle(this.containerParent, 'width'));
        this.boxH = parseInt(this.getStyle(this.containerParent, 'height'));
        this.left = 300;
        this.top = 300;
        this.container.style = `width: ${w}px;height: ${h}px;position: absolute;left: 300px;top: 300px; cursor: move;z-index: 10;border: 1px solid #6cf;`;
        this.createPoints();
        
        clone = this.element.cloneNode(true);
        clone.style.width = '100%';
        clone.style.height = '100%';
        this.container.appendChild(clone); // 克隆一个元素副本，不然替换的新元素包含原来被替换的旧元素会报错
        this.containerParent.replaceChild(this.container, this.element); // 替换原本标签

    }
    boxMove(){
        /** 
         * 拖动盒子元素绑定
        */
        // document.addEventListener('mouseup', () => {
        //     this.isBoxMove = false;
        // })
        let boxMovecallback = (e) => {
            if(this.isBoxMove){
                let x = e.clientX, y = e.clientY, left, top, el = this.container;
                left = this.initLeft + x - this.x;
                top = this.initTop + y - this.y;
                // 不限制边界，直接拖拽
                // this.elementMove(left, top);
                // return;

                this.elementMove(left, top);
                if(el.offsetLeft <= 0){
                    left  = 0;
                }
                if(el.offsetTop <= 0){
                    top = 0;
                }
                if(el.offsetLeft >= this.boxW - this.w){
                    left = this.boxW - this.w;
                }
                if(el.offsetTop >= this.boxH - this.h){
                    top = this.boxH - this.h;
                }
                this.elementMove(left, top);
            }
        };
        this.container.addEventListener('mousedown', (e) => {
            this.isBoxMove = true;
            this.initLeft = parseInt(this.getStyle(this.container, 'left'));
            this.initTop = parseInt(this.getStyle(this.container, 'top'));
            this.offsetX = this.container.offsetLeft;
            this.offsetY = this.container.offsetTop;
            this.x = e.clientX;
            this.y = e.clientY;
            document.addEventListener('mousemove', boxMovecallback);
        });
        this.container.addEventListener('mouseup', () => {
            this.isBoxMove = false;
            document.removeEventListener('mousmove', boxMovecallback);
            // 移除绑定的事件，除了传入原来绑定的回调函数，还可以将对应事件回调函数清空 此方法只使用dom1级事件
            // document.onmousemove = function(){}  绑定
            // document.onmousemove = null  解绑

        })
    }
    elementMove(left, top){
        this.left = left;
        this.top = top;
        this.container.style.left = `${left}px`;
        this.container.style.top = `${top}px`;
    }
    convert(val, binary){
        /** 
         * 进制转换
        */
        return parseInt(val, binary);
    }
    createPoints(){
        let p_w = 10, color = '#6cf';
        let points = {
            // top: {
            //     cursor: 'crosshair'
            // },
            leftTop: {
                cursor: 'nw-resize',
                left: -p_w / 2,
                top: -p_w / 2,
                'margin-left': 0,
                'margin-top': 0
            },
            leftMid: {
                cursor: 'w-resize',
                left: -p_w / 2,
                top: '50%',
                'margin-left': 0,
                'margin-top': -p_w / 2
            },
            leftBottom: {
                cursor: 'sw-resize',
                left: -p_w / 2,
                top: '100%',
                'margin-left': 0,
                'margin-top': -p_w / 2
            },
            midTop: {
                cursor: 'n-resize',
                left: '50%',
                top: -p_w / 2,
                'margin-left': -p_w / 2,
                'margin-top': 0
            },
            midBottom: {
                cursor: 'n-resize',
                left: '50%',
                top: '100%',
                'margin-left': -p_w / 2,
                'margin-top': -p_w / 2
            },
            rightTop: {
                cursor: 'sw-resize',
                left: '100%',
                top: -p_w / 2,
                'margin-left': -p_w / 2,
                'margin-top': 0
            },
            rightMid: {
                cursor: 'w-resize',
                left: '100%',
                top: '50%',
                'margin-left': -p_w / 2,
                'margin-top': -p_w / 2
            },
            rightBottom: {
                cursor: 'nw-resize',
                left: '100%',
                top: '100%',
                'margin-left': -p_w / 2,
                'margin-top': -p_w / 2
            }
        };
        for(let point in points){
            let p = document.createElement('em'), text;
            text = `position: absolute;width: ${p_w}px; height: ${p_w}px; background: none; border: 1px solid ${color};`;
            for(let attr in points[point]){
                let v = points[point][attr], val;
                val = typeof v === 'number' ? v + 'px;' : `${v};`;
                text += `${attr}: ${val};`;
            }
            p.style.cssText = text;
            this.points.push(p);
            this.container.appendChild(p);
            this.bindEvent(p, point);
        }
        this.container.style.border = `1px solid rgba(${this.convert('66', 16)}, ${this.convert('cc', 16)}, ${this.convert('ff', 16)}, .5)`;
    }
    bindEvent(el, type){
        /**
         * @param el 需要绑定鼠标事件的元素
         * @param type 用来区分不同按钮，拖拽事件进行的不同操作处理
         */
        let callback = (e) => {
            if(!this.isMove){return;}
            if(type ===  'rightMid' || type === 'rightTop' || type === 'rightBottom'){
                // 固定left
                this.rightDraw(e, type);
            }
            if(type === 'leftMid' || type === 'leftTop' || type === 'leftBottom'){
                this.leftDraw(e, type);
            }
            if(type === 'midTop' || type === 'midBottom'){
                this.middleDraw(e, type);
            }
        }
        el.addEventListener('mousedown', e => {
            this.isMove = true;
            this.isBoxMove = false;
            e.stopPropagation();
            this.initC_x = e.clientX;
            this.initC_y = e.clientY;
            this.initTop = parseInt(this.getStyle(this.container, 'top'));
            this.initLeft = parseInt(this.getStyle(this.container, 'left'));
            document.addEventListener('mousemove', callback);
        });
        el.addEventListener('mouseup', (e) => {
            this.isMove = false;
            this.isBoxMove = true;
            document.removeEventListener('mousemove', callback)
        });
        document.addEventListener('mouseup', () => {
            this.isMove = false;
            // this.isBoxMove = false;
            this.initVal();
        })
    }
    initVal(){
        // 拉伸弹框之后，重新初始化新的值
        let w = this.getStyle(this.container, 'width');
        let h = this.getStyle(this.container, 'height');
        w = parseInt(w);
        h = parseInt(h);
        this.w = w;
        this.h = h;
    }
    rightDraw(e, type){
        let w, h, obj = {};
        w = e.clientX - this.initC_x;
        h = e.clientY - this.initC_y;
        obj.width = this.w + w;
        // this.container.style.width = `${this.w + w}px`;
        if(type === 'rightTop'){
            // 往右上角拉伸时，高度、宽度以及top都要发生变化
            // this.container.style.top = `${this.initTop + h}px`;
            // this.container.style.height = `${this.h - h}px`;
            obj.top = this.initTop + h;
            obj.height = this.h - h;
        }
        if(type === 'rightBottom'){
            // this.container.style.height = `${this.h + h}px`;
            obj.height = this.h + h;
        }
        this.calcStyle(obj);
    }
    leftDraw(e, type){
        let w, h, obj = {};
        w = e.clientX - this.initC_x;
        h = e.clientY - this.initC_y;
        obj.width = this.w - w;
        obj.left = this.initLeft + w;
        if(type === 'leftTop'){
            obj.top = this.initTop + h;
            obj.height = this.h - h;
        }
        if(type === 'leftBottom'){
            obj.height = this.h + h;
        }
        this.calcStyle(obj);
    }
    middleDraw(e, type){
        let h = e.clientY - this.initC_y, obj = {};
        if(type === 'midTop'){
            obj.top = this.initTop + h;
            obj.height = this.h - h;
            // this.container.style.top = `${this.initTop + h}px`;
            // this.container.style.height = `${this.h - h}px`;
        }
        if(type === 'midBottom'){
            // 固定顶部
            // this.container.style.height = `${this.h + h}px`;
            obj.height = this.h + h;
        }
        this.calcStyle(obj);
    }
    calcStyle(obj = {}){
        // 元素拉伸之后给元素相应的属性赋值
        for(let key in obj){
            if(obj.hasOwnProperty(key)){
                this.container.style[key] = `${obj[key]}px`;
            }
        }
    }
    mouseStartVal(e){
        this.c_x  = e.clientX;
        this.c_y = e.clientY;
    }
    mouseEnd(obj){
        /**
         * @param obj  Object
         * @param obj.key 表示要设置的元素属性
         * @param obj.val 表示要设置的元素属性值
         */
        for(let key in obj){
            this.container.style[key] = obj[key];
        }
    }
    elementChange(...arg){
        /** 
         * @param arg包含鼠标移动取到的点数据（e）和当前操操作的点的类别
        */
        let type = arg[0];
        let e = arg[1];
        let w, h;
        // 往右边拉伸，left不变，宽度变化
        if(type === 'rightMid'){
            w = this.w + e.clientX - this.c_x;
            this.mouseEnd({width: `${w}px`});
        }
        // 往左侧拉伸，left变化，宽度也跟着变化
        if(type === 'leftMid'){

        }
        console.log(type);
        console.log(e);
    }
    
    throttle(fn, t){
        let time = 0;
        return (...arg) => {
            let now = +new Date();
            if(now - time > t){
                fn.call(this,...arg);
                time = now;
            }
        }
    }
    getStyle(el, attr, pseudo = null){
        /**
         * @params el(elementObject)   attr(string)  pseudo(string) 
         * @param el 需要获取样式的元素 
         * @param attr 需要获取值的
         * @param pseudo 需要获取样式的伪元素
         */
        if(window.getComputedStyle) return window.getComputedStyle(el, pseudo)[attr];
        return el.currentStyle[attr];
    }
}