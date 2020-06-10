// 元组(Tuple)  
// 元组类型与数组类型非常相似，表示一个已知元素数量和类型的数组，各元素的类型不必相同。

// 如下，定义了一个数组，包含两个元素，第一个元素为string类型，第二个元素为number类型，
// 若长度不一致或者对应的数据类型不一致则会报错，就是顺序不对也会报错
let x: [string, number];
x = ['hello', 1]
// x = [10, 'h'] //error
x = ['a', 2]

// 我们可以把元组看成严格版的数组，比如 [string, number]我们可以看成是： 
interface Tuple extends Array<string | number> {
    0: string,
    1: number,
    length: 2
}

// 元组越界问题，比如TypeScript允许向元组中使用数组的push方法插入新元素： 
const tuple: [string, number] = ['1', 1]
tuple.push(2)
// console.log(tuple[2])  若直接访问越界的元素，则会报错


// Object  
// object表示非原始类型，也就是除number、string、boolean、symbol、null或undefined之外的类型。 
let value: object
value = [1]
value = [1, 'hello']
value = {}
// 枚举类型
enum Direction{
    Center = 1
}
value = Direction
