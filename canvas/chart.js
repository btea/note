class Chart{
    constructor(ele){
        this.initElement(ele);
    }
    initElement(ele){
        let ctx = ele.getContext('2d');
        this.ele = ele;
        this.width = ele.width || 100;
        this.height = ele.height || 100;
        this.ctx = ctx;
        this.initContext();
    }
    initContext() {
        let ctx = this.ctx;
        let backingStoreRatio = ctx.webkitBackingStorePixelRatio ||
            ctx.mozBackingStorePixelRatio ||
            ctx.msBackingStorePixelRatio ||
            ctx.oBackingStorePixelRatio ||
            ctx.backingStorePixelRatio || 1;
        let devicePixelRatio = window.devicePixelRatio || 1;
        let ratio = devicePixelRatio / backingStoreRatio;
        this.ele.style.width = `${this.width}px`
        this.ele.style.height = `${this.height}px`
        this.ctx.scale(ratio, ratio)
        this.ele.width = this.width * ratio;
        this.ele.height = this.height * ratio;
    }
    initData(options){
        if(Array.isArray(options)){
            options.forEach(arr => {
                this.start(arr);
            })
        }
    }
    resize(){
        let parent, w, h, style;
        parent = this.ele.parentNode;
        style = this.getStyle(ele);
        w = parseInt(style.width);
        h = parseInt(style.height);
        this.ele.width = w;
        this.ele.height = h;
        this.initElement(ele);
    }
    getStyle(ele){
        if(window.getComputedStyle){
            return window.getComputedStyle(ele, null);
        }else{
            return ele.currentStyle();
        }
    }
    start(options){
        let {type, data, smooth} = options;
        let points = this.xAxisCal(data);
        if(type === 'line'){
            this.drawLine(points, smooth);
        }
        if(type === 'area'){
            this.lineArea(points); // 面积区域图形
        }
        if(type === 'bar'){
            this.bar(points);
        }
    }

    xAxisCal(data){
        let n = Math.floor(this.width / data.length);
        return data.map((val,i) => ({x: n * i, y: val}));
    }
    drawLine(points, smooth = false){
        this.ctx.lineWidth = 2;
        if(smooth){
            // this.smoothCurve(points);
            this.linePoints(points);
            this.bezierCurve(points);
            return ;
        }
        this.linePoints(points);
    }
    linePoints(points){
        this.ctx.beginPath();
        this.ctx.strokeStyle = this.color();
        this.ctx.lineJoin="round";
        this.lineTo(points);
        // this.ctx.strokeStyle = this.color();
        // this.ctx.stroke();
        // this.ctx.globalCompositeOperation = 'source-over';
        // this.ctx.closePath();
    }
    smoothCurve(points){
        let len = points.length, 
            i = 1, 
            controlPoint = {},
            controlPoint1,
            controlPoint2,
            direction,
            t = .4,
            cp
        ;
        if(points.length > 1){
            this.ctx.strokeStyle = this.color();
            this.ctx.beginPath();
            this.ctx.moveTo(points[0].x, points[0].y);
            /**
                quadraticCurveTo(cp1x, cp1y, x, y);其中cp1x,cp1y是控制点的坐标，x和y是终点坐标

                假如有三个点A、B、C 控制点为B和C的中点，即cp1的坐标点为cp1x = (Bx + Cx) / 2,cp1y = (By + Cy) / 2;
            **/
           for(; i < len - 1; i++){
            //    由于二次贝塞尔曲线只有一个控制点，所以它永远只能画向一个方向弯曲的弧线，画不出s形曲线。要绘制s型曲线，需要使用三次贝塞尔曲线。
            //    this.ctx.quadraticCurveTo(controlPoint.x, controlPoint.y, points[i].x, points[i].y);


            //    三次贝塞尔曲线
                direction = points[i + 1].y - points[i].y;
                direction = direction >= 0 ? direction : direction * (-1)
                controlPoint1 = {
                    x: points[i].x + (points[i + 1].x - points[i].x) / 2 * t,
                    y: points[i].y + direction / 2 * t, 
                }
                controlPoint2 = {
                    x: points[i + 1].x - (points[i + 1].x - points[i].x) / 2 * t,
                    y: points[i + 1].y + direction / 2 * t
                }

                // debugger
                this.ctx.bezierCurveTo(controlPoint1.x, controlPoint1.y, controlPoint2.x, controlPoint2.y, points[i + 1].x, points[i + 1].y);
           }
            // for(;i < len - 2; i++){
            //     controlPoint.x = (points[i].x + points[i + 1].x) / 2;
            //     controlPoint.y = (points[i].y + points[i + 1].y) / 2;
            //     this.ctx.quadraticCurveTo(points[i].x, points[i].y, controlPoint.x, controlPoint.y);
            // }
            // this.ctx.quadraticCurveTo(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y);
            this.ctx.stroke();
            this.ctx.closePath();
        }else{
            this.linePoints(points);
        }
    }
    pointCalac(points){
        const list = [];
        let i = 0;
        
        for(; i < points.length - 2; i++){
            list.push({
                start: points[i],
                end:  points[i + 1],
                dot1: {
                    x: Math.floor((points[i].x + points[i + 1].x) / 2),
                    y: points[i].y
                },
                dot2: {
                    x: Math.floor((points[i].x + points[i + 1].x) / 2),
                    y: points[i + 1].y
                }
            })
        }
        return list;        
    }


    bezierCurve(points){
        const list = this.getCurveList(points);
        // const list = this.pointCalac(points);
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        for(let i = 0; i < list.length; i++){
            this.ctx.moveTo(list[i].start.x, list[i].start.y);
            this.ctx.bezierCurveTo(list[i].dot1.x, list[i].dot1.y, list[i].dot2.x, list[i].dot2.y, list[i].end.x, list[i].end.y);
        }
        
        this.ctx.strokeStyle = this.color(.5);
        this.ctx.stroke();

    }
    getCurveList(points){
        const t = 1/4;
        const curveList = [];
        let i = 1;
        curveList.push({
            start: points[0],
            end: points[1],
            dot1: points[0],
            dot2: null
        });
        for(; i < points.length - 1; i++){
            let cur, next, prev;
            cur = points[i];
            next = points[i + 1];
            prev = points[i - 1];
            let p1 = {
                x: cur.x - t * (Math.abs(cur.x - prev.x)),
                y: cur.y
            };
            let p2 = {
                x: cur.x + t * (Math.abs(cur.x - next.x)),
                y: cur.y
            };
            curveList[i - 1].dot2 = p1;
            curveList.push({
                start: cur,
                end: next,
                dot1: p2,
                dot2: null
            })
        }
        curveList[curveList.length - 1].dot2 = points[i];
        return curveList;
    }

    lineArea(points){
        let first, y;
        y = this.height;
        first = {};
        first.x = points[0].x;
        first.y = y;
        points.unshift(first);
        this.pointLength = points.length + 1;
        
        this.drawLinePoint(points);
        // this.intervalDraw(points);
        
    }
    drawLinePoint(points){
        let n = 1, timer;
        this.anotherCanvas();
        timer = setInterval(() => {
            if(n >= this.pointLength){
                clearInterval(timer);
                this.lineTo(points);
            }
            n++
            this.intervalDraw(points.slice(0, n));
        }, 17 * 2 * n);
    }
    intervalDraw(points){
        let grd;
        this.anotherCtx.clearRect(0, 0, this.width, this.height);
        this.anotherCtx.beginPath();
        this.lastPoint(points);

        this.anotherLineTo(points);
        // this.lineTo(points);
        grd = this.anotherCtx.createLinearGradient(this.width / 2, 0, this.width / 2, this.height);
        grd.addColorStop(0,"rgba(102, 204, 255, .2)");
        grd.addColorStop(1,"rgba(0, 255, 255, .2)");
        this.anotherCtx.fillStyle = grd;
        this.anotherCtx.fill();
        this.anotherCtx.closePath();
    }
    anotherLineTo(points){
        let n = points.length;
        this.anotherCtx.moveTo(points[0].x + 15, points[0].y);
        points.slice(1).map(p => {
            this.anotherCtx.lineTo(p.x + 15, p.y);
        });
        
        this.anotherCtx.stroke();
        this.anotherCtx.globalCompositeOperation = 'source-over';
        this.anotherCtx.closePath();
    }
    anotherCanvas(){
        let ctx, ele;
        let canvas = document.createElement('canvas');
        canvas.width = this.width;
        canvas.height = this.height;
        canvas.style.position = 'absolute';
        canvas.style.left = '0';
        canvas.style.top = '0';
        this.anotherCanvas = ele = this.ele.parentNode;
        ele.appendChild(canvas);
        ctx = canvas.getContext('2d');
        this.anotherCtx = ctx;
    }
    lastPoint(points){
        let last, y;
        last = {};
        last.x = points[points.length - 1].x;
        last.y = y = this.height;
        points.push(last);
    }
    lineTo(points){
        let n = points.length, grd;
        this.ctx.beginPath();
        this.lastPoint(points);
        grd = this.ctx.createLinearGradient(this.width / 2, 0, this.width / 2, this.height);
        grd.addColorStop(0,"rgba(102, 204, 255, .2)");
        grd.addColorStop(1,"rgba(0, 255, 255, .2)");


        this.ctx.moveTo(points[0].x + 15, points[0].y);
        points.slice(1).map(p => {
            this.ctx.lineTo(p.x + 15, p.y);
        });
        
        this.ctx.stroke();
        this.ctx.globalCompositeOperation = 'source-over';
        this.ctx.closePath();
        
        this.ctx.fillStyle = grd;
        this.ctx.fill();
        this.ctx.closePath();
        
        setTimeout(() => {
            this.anotherCtx.clearRect(0, 0, this.width, this.height);
            this.ctx.clearRect(points[0].x + 15, points[1].y, 1, points[0].y - points[1].y);
            this.ctx.clearRect(points[n - 1].x + 15, points[n - 1].y, 1, points[n - 1].y - points[n - 2].y);
    
            this.ctx.beginPath();
            this.ctx.strokeStyle = grd;
            this.ctx.moveTo(points[0].x + 15, points[0].y);
            this.ctx.lineTo(points[1].x + 15, points[1].y);
            this.ctx.stroke();
    
            this.ctx.beginPath();
            this.ctx.moveTo(points[n - 2].x + 15, points[n - 2].y);
            this.ctx.lineTo(points[n - 1].x + 15, points[n - 1].y);
            this.ctx.stroke();
        }, 100);

        
    } 
    bar(points){
        let rect, w;
        rect = [];
        w = 30;
        points.map(p => {
            let x, y, h;
            x = p.x;
            y = p.y;
            h = this.height - y;
            rect.push([x, y, w, h]);
        });
        this.drawBar(rect);
    }
    drawBar(arr){
        let c = this.color(.4);
        arr.map(a => {
            this.ctx.fillStyle = c;
            this.ctx.beginPath();
            this.ctx.rect(...a);
            this.ctx.fill();
            this.ctx.closePath();
        });
    }

    color(opacity = 1){
        return `rgba(${this.random()},${this.random()},${this.random()}, ${opacity})`;
    }

    random(max = 255, min = 0){
        return Math.floor(Math.random() * (max - min + 1) + min); 
    }
}