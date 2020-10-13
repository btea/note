// 快速排序
// 取数组中间位置元素，小于它的放入左边数组，大于它的放入右边数组，再把左右数组分别放入递归，最后拼接
function quickSort(arr) {
    let left = []
    let right = []
    let len = arr.length;
    if (len <= 1) return arr
    let index = Math.floor(len / 2)
    let mid = arr.splice(index, 1)[0]
    len--
    for(let i = 0; i < len; i++) {
        if (arr[i] > mid) {
            right.push(arr[i])
        }else {
            left.push(arr[i])
        }
    }
    return quickSort(left).concat(mid, quickSort(right))
}
const arr = [3,2,4,5,6,5,7,8,9]
console.log(quickSort(arr))