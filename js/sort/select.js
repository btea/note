// 选择排序
function selectSort(arr) {
    let len = arr.length
    let minIndex
    for(let i = 0; i < len - 1; i++) {
        minIndex = i
        for(let j = i ; j < len; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j
            }
        }
        if (minIndex !== i) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]
        }
    }
    return arr
}
const arr = [3,2,4,5,6,5,7,8,9]
console.log(selectSort(arr))