var eventUtil = {
    addHandler: function(element, type, handler){
        if (element.addEventListener) {
            element.addEventListener(type, handler)
        } else if(element.attachEvent) {
            element.attachEvent('on' + type, handler)
        } else {
            element['on' + type] = handler
        }
    },
    removeHandler: function(element, type, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler)
        } else if(element.detachEvent) {
            element.detachEvent('on' + type, handler)
        } else {
            element['on' + type] = null
        }
    },
    getEvent: function(event) {
        return event || window.event
    },
    getTarget: function(event) {
        return event.target || event.srcElement
    },
    preventDefault: function(event) {
        // 阻止默认事件
        if (event.preventDefault) {
            event.preventDefault()
        } else {
            event.returnValue = false
        }
    },
    stopPropagation: function(event) {
        // 阻止冒泡
        if (event.stopPropagation) {
            event.stopPropagation()
        } else {
            event.cancelBubble = true
        }
    }
}