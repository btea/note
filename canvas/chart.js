class Chart{
    constructor(ele){
        let ctx = ele.getContext('2d');
        this.ele = ele;
        this.width = ele.width || 100;
        this.height = ele.height || 100;
        this.ctx = ctx;
    }
    initData(options){
        if(Array.isArray(options)){
            options.forEach(arr => {
                this.start(arr);
            })
        }
    }

    start(options){
        let {type, data, smooth} = options;
        let points = this.xAxisCal(data);
        if(type === 'line'){
            this.drawLine(points, smooth);
        }
        if(type === 'bar'){
            this.lineArea(points);
        }
    }

    xAxisCal(data){
        let n = Math.floor(this.width / data.length);
        return data.map((val,i) => ({x: n * i, y: val}));
    }
    drawLine(points, smooth = false){
        this.strokeStyle = this.color();
        this.ctx.lineWidth = 2;
        if(smooth){
            this.smoothCurve(points);
            return ;
        }
        this.linePoints(points);
    }
    linePoints(points){
        this.strokeStyle = this.color();
        this.ctx.beginPath();
        this.lineTo(points);
        this.ctx.strokeStyle = this.color();
        this.ctx.stroke();
        this.ctx.closePath();
    }
    smoothCurve(points){
        let len = points.length, i = 1, controlPoint;
        if(points.length > 3){
            this.ctx.moveTo(points[0].x, points[0].y);
            /**
                quadraticCurveTo(cp1x, cp1y, x, y);其中cp1x,cp1y是控制点的坐标，x和y是终点坐标

                假如有三个点A、B、C 控制点为B和C的中点，即cp1的坐标点为cp1x = (Bx + Cx) / 2,cp1y = (By + Cy) / 2;
            **/
           for(; i < len - 1; i++){
               controlPoint = {
                   x: (points[i - 1].x + points[i].x) / 2,
                   y: (points[i - 1].y + points[i].y) / 2
               }
               this.ctx.quadraticCurveTo(controlPoint.x, controlPoint.y, points[i].x, points[i].y);
           }
           this.ctx.stroke();
           this.ctx.closePath();
        }else{
            this.drawLine(points);
        }
    }
    lineArea(points){
        let first, last, y;
        y = this.height;
        first = {};
        last = {};
        first.x = points[0].x;
        first.y = y;
        points.unshift(first);
        last.x = points[points.length - 1].x;
        last.y = y;
        points.push(last);
        this.ctx.beginPath();
        this.lineTo(points);
        this.ctx.fillStyle = this.color(.5);
        this.ctx.fill();
        this.ctx.closePath();
    }
    lineTo(points){
        this.ctx.moveTo(points[0].x, points[0].y);
        points.slice(1).map(p => {
            this.ctx.lineTo(p.x, p.y);
        });

    }

    color(opacity = 1){
        return `rgba(${this.random()},${this.random()},${this.random()}, ${opacity})`;
    }

    random(max = 255, min = 0){
        return Math.floor(Math.random() * (max - min + 1) + min); 
    }
}