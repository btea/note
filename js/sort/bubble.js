function bubble(arr) {
    var flag = true
    for(var i = 0; i < arr.length; i++) {
        for(var j = 0; j < arr.length - 1 - i; j++) {
            var v
            if (arr[j] > arr[j + 1]) {
                flag = false
                v = arr[j + 1]
                arr[j + 1] = arr[j]
                arr[j] = v
            }
        }
        if (!flag) {
            break
        }
    }
    return arr
}