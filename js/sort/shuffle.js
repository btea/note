// 数组乱序

function shuffle(arr) {
    var x, j, i = arr.length;
    for(; i; i--) {
        j = Math.floor(Math.random() * i)
        x = arr[i - 1]
        arr[i - 1] = arr[j]
        arr[j] = x
    }
    return arr
}