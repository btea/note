var CookieUtil = {
    get: function(name) {
        var cookieName = encodeURIComponent(name) + '=',
            cookieStart = document.cookie.indexOf(cookieName),
            cookieValue = null
        ;
        if (cookieStart > -1) {
            var cookieEnd = document.cookie.indexOf(';', cookieStart)
            if (cookieEnd == -1) {
                cookieEnd = document.cookie.length
            }
            cookieValue = document.cookie.slice(cookieStart + cookieValue.length, cookieEnd)
            cookieValue = decodeURIComponent(cookieValue)
        }
        return cookieValue
    },
    set: function(name, value, expires) {
        var cookieText = encodeURIComponent(name) + '=' + encodeURIComponent(value)
        if (expires instanceof Date) {
            cookieText += ';expires=' + expires.toGMTString()
        }
        document.cookie = cookieText
    },
    unset: function(name) {
        this.set(name, '', new Date(0))
    }
}