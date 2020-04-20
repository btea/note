// 把 devtool 打印的对象下载下来
(function(console){
    console.save = function(data, filename){
        if(!data) {
            console.error('Console.save: No data')
            return;
        }
        if(!filename) filename = 'console.json'
        if(typeof data === 'object'){
            data = JSON.stringify(data, undefined, 4)
        }
        var blob = new Blob([data], {type: 'text/json'}),
		// e = document.createEvent('MouseEvents'),
		e = new MouseEvent('click');
        a = document.createElement('a');
        a.download = filename;
        a.href = window.URL.createObjectURL(blob);
		a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
		// initMouseEvent 方法已废弃， 用MouseEvent构造函数替代  https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent/MouseEvent
        // e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
        a.dispatchEvent(e)
    }
})(console)