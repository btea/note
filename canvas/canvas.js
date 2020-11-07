class CanvasInit{
    init(canvas, width, height) {
        let ctx = canvas.getContext('2d');
        let backingStoreRatio = ctx.webkitBackingStorePixelRatio ||
            ctx.mozBackingStorePixelRatio ||
            ctx.msBackingStorePixelRatio ||
            ctx.oBackingStorePixelRatio ||
            ctx.backingStorePixelRatio || 1;
        let devicePixelRatio = window.devicePixelRatio || 1;
        let ratio = devicePixelRatio / backingStoreRatio;
        canvas.style.width = `${width}px`
        canvas.style.height = `${height}px`
        ctx.scale(ratio, ratio)
        canvas.width = width * ratio;
        canvas.height = height * ratio;
        return ctx
    }
}


