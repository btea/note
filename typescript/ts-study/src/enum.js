// 枚举类型是很多语言都拥有的类型，它用于声明一组命名的常熟，当一个变量有几种可能的值时，可以将它定义为枚举类型  
// 数字枚举
// 当我们声明一个枚举类型时，虽然没有给他们赋值，但是它们的值其实是默认的数字类型，而且默认从0开始依次累加：  
var Direction;
(function (Direction) {
    Direction[Direction["Up"] = 0] = "Up";
    Direction[Direction["Down"] = 1] = "Down";
    Direction[Direction["Left"] = 2] = "Left";
    Direction[Direction["Right"] = 3] = "Right";
})(Direction || (Direction = {}));
console.log(Direction.Up === 0);
console.log(Direction.Down === 1);
console.log(Direction.Left === 2);
console.log(Direction.Right === 3);
// 当我们把第一个值赋值后，后面也会根据第一个值进行累加： 
var Direction1;
(function (Direction1) {
    Direction1[Direction1["Up"] = 10] = "Up";
    Direction1[Direction1["Down"] = 11] = "Down";
    Direction1[Direction1["Left"] = 12] = "Left";
    Direction1[Direction1["Right"] = 13] = "Right";
})(Direction1 || (Direction1 = {}));
// Direction1.Up === 10 
// Direction1.Down === 11
console.log(Direction1);
// 字符串枚举
// 枚举类型的值其实也可以是字符串类型：
var Direction2;
(function (Direction2) {
    Direction2["Up"] = "Up1";
    Direction2["Down"] = "Down1";
    Direction2["Left"] = "Left1";
    Direction2["Right"] = "Right1";
})(Direction2 || (Direction2 = {}));
console.log(Direction2);
// 异构枚举
var BooleanLike;
(function (BooleanLike) {
    BooleanLike[BooleanLike["No"] = 0] = "No";
    BooleanLike["Yes"] = "YESM";
})(BooleanLike || (BooleanLike = {}));
console.log(BooleanLike);
