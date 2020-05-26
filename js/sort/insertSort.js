function insertSort(arr) {
    for(var i = 1; i < arr.length; i++) {
        var j = i
        while(arr[j - 1] > arr[j]) {
            [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]]
            j--
        }
    }
    return arr
}

