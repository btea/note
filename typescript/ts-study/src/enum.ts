// 枚举类型是很多语言都拥有的类型，它用于声明一组命名的常熟，当一个变量有几种可能的值时，可以将它定义为枚举类型  

// 数字枚举
// 当我们声明一个枚举类型时，虽然没有给他们赋值，但是它们的值其实是默认的数字类型，而且默认从0开始依次累加：  
enum Direction{
    Up,
    Down,
    Left,
    Right
}
console.log(Direction.Up === 0)
console.log(Direction.Down === 1)
console.log(Direction.Left === 2)
console.log(Direction.Right === 3)

// 当我们把第一个值赋值后，后面也会根据第一个值进行累加： 
enum Direction1 {
    Up = 10,
    Down,
    Left,
    Right
}
// Direction1.Up === 10 
// Direction1.Down === 11
console.log(Direction1)


// 字符串枚举
// 枚举类型的值其实也可以是字符串类型：
enum Direction2{
    Up = 'Up1',
    Down = 'Down1',
    Left = 'Left1',
    Right = 'Right1'
}
console.log(Direction2)


// 异构枚举  异构枚举里面，关于值为number的和和数字枚举一样，会有反向映射  
enum BooleanLike{
    No = 0,
    Yes = 'YESM'
}
console.log(BooleanLike)


// 常量枚举
// 枚举可以被 const 声明为常量
const enum DirectionConst{
    Name = 'name',
    age = 10
}
const ab = DirectionConst.Name


// 联合枚举类型
enum Direction3{
    Up,
    Down,
    Left,
    Right
}
declare let a1: Direction3

enum Animal{
    Dog,
    Cat
}

a1 = Direction3.Up
a1 = Direction3.Down
// a1 = Animal.Cat  // 报错
// 因为变量 a1被声明为 Direciton3类型，可以看成声明了一个联合类型 Direction3.Up | Direction3.Down | Direction3.Left | Direction3.Right,
// 只有这四个类型其中的成员才符合要求


// 枚举合并
enum Direction4{
    Up = 'Up'
}
enum Direction4{
    Center = 1
}
// 两者会自动合并


// 为枚举提那家静态方法
enum Month{
    January,
    February,
    March,
    April,
    May,
    June,
    July,
    August,
    September,
    October,
    November,
    December,
}
function isSummer(month: Month): boolean {
    switch (month) {
        case Month.June:
        case Month.July:
        case Month.August:
            return true;
        default:
            return false;
    }
}

namespace Month{
    export function isSummer(month: Month): boolean {
        switch (month) {
            case Month.June:
            case Month.July:
            case Month.August:
                return true;
            default:
                return false;
        }
    }
}