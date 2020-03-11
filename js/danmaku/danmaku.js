console.log('弹幕库')
function request(url) {
    let xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function() {
        if(xhr.readyState === 4){
            console.log(xhr)
        }
    }
    xhr.open('get', url)
    xhr.send('')
}
