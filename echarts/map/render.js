class Yrender {
    constructor(options) {
        this.data = mapData;
        this.el = options.el;
        this.width = this.el.width;
        this.height = this.el.height;
        this.initCanvas();
        this.calculateData();
        this.padding = options.padding || 50; // 默认给地图区域留50px的边界距离
        this.addEvent();
    }
    initCanvas() {
        this.ratio = window.devicePixelRatio || 1;
        this.el.style.width = this.width + 'px';
        this.el.style.height = this.height + 'px';
        this.el.width = this.width * this.ratio;
        this.el.height = this.height * this.ratio;
        this.ctx = this.el.getContext('2d');
        this.ctx.scale(this.ratio, this.ratio);
    }
    calculateData() {
        this.areas = [];
        let v = this.getBoundry();
        let x = v.maxLog - v.minLog;
        let y = v.maxLat - v.minLat;
        let xScale = (this.width - 50) / x;
        let yScale = (this.height - 50) / y;
        let scale = xScale < yScale ? xScale : yScale;
        this.scale = Math.floor(scale);
        this.minLog = v.minLog;
        this.minLat = v.minLat;
        this.drawArea();
    }
    getBoundry() {
        let minLog, maxLog, minLat, maxLat;
        let log = [],
            lat = [];
        this.data.features.forEach(item => {
            let points = item.geometry.coordinates[0][0];
            points.forEach(p => {
                log.push(p[0]);
                lat.push(p[1]);
            });
            this.areas.push({
                points: points,
                name: item.properties.name,
                center: item.properties.center
            });
        });
        maxLog = Math.max(...log);
        minLog = Math.min(...log);
        maxLat = Math.max(...lat);
        minLat = Math.min(...lat);
        return { maxLog, minLog, maxLat, minLat };
    }
    drawArea() {
        this.clear();
        this.areas.forEach(item => {
            this.drawLine(item.points);
            this.drawText(item);
        });
    }
    drawLine(points) {
        this.ctx.beginPath();
        let p = points[0];
        let x = (p[0] - this.minLog) * this.scale;
        let y = (p[1] - this.minLat) * this.scale;
        this.ctx.moveTo(x, y);
        // console.log({ x, y });
        for (let i = 0; i < points.length; i++) {
            x = (points[i][0] - this.minLog) * this.scale;
            y = (points[i][1] - this.minLat) * this.scale;
            this.ctx.lineTo(x, y);
        }
        this.ctx.stroke();
        // 添加了填充颜色之后，边界线似乎就不那么明显了~~
        this.ctx.fillStyle = '#' + Math.random().toString(16).slice(2, 8)
        this.ctx.fill();
    }
    drawText(item) {
        this.ctx.save();
        this.ctx.textAlign = 'center';
        let x, y;
        x = (item.center[0] - this.minLog) * this.scale;
        y = (item.center[1] - this.minLat) * this.scale;
        this.ctx.fillStyle = '#6cf';
        this.ctx.font = '16px 微软雅黑';
        this.ctx.fillText(item.name, x, y);
        this.ctx.restore();
    }
    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }
    addEvent() {
        this.el.addEventListener(
            'mousemove',
            this.throttle(e => {
                let x = e.layerX;
                let y = e.layerY;
                this.clear();
                let isIn = false;
                for (let i = 0; i < this.areas.length; i++) {
                    this.drawLine(this.areas[i].points);
                    this.drawText(this.areas[i]);
                    if (this.ctx.isPointInPath(x * this.ratio, y * this.ratio)) {
                        isIn = true;
                        this.ctx.save();
                        this.ctx.lineWidth = 2;
                        this.drawLine(this.areas[i].points);
                        this.ctx.restore();
                    }
                }
                this.el.style.cursor = isIn ? 'pointer' : 'default';
            }, 50)
        );
    }
    throttle(fn, time) {
        let timer;
        return e => {
            if (!timer) {
                timer = setTimeout(() => {
                    timer = null;
                    fn(e);
                }, time);
            }
        };
    }
}
