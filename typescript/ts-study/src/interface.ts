// TypeScript 的核心原则之一是对值所具有的结构进行类型检查,它有时被称做“鸭式辨型法”或“结构性子类型化”。
interface User{
    name: string,
    age?: number,   // 可选属性
    readonly isMale: boolean, // 可读属性
    say: (words: string) => string,  // 函数类型
    say1: Say,
    phone: Phone
}
// 函数类型另外一种写法
interface Say{
    (words: string): string
}

// 可索引类型
interface Phone{
    [name: string]: string
}

const getUserName = (user: User) => user.isMale

getUserName({
    name: 'a',
    isMale: true,
    say: function(v) {return v},
    say1: function(v) {return v},
    phone: {

    }
})

interface Config {
    width?: number
}
function CalculateAreas(config: Config): {area: number} {
    let square = 10
    if (config.width) {
        square = config.width * config.width
    }
    return {area: square}
}
// 若直接调用方法，传参{widdth: 5}，ts会报错，因为接口Config里面只有width属性而没有widdth属性，
// 使用以下两种方式可解决这个报错
let mySquare = CalculateAreas({widdth: 5} as Config)
let c1: any = {widdth: 5}
CalculateAreas(c1)

// 继承接口
interface VIPUser extends User{
    broadcast: () => void
}

// 继承多个接口
interface SuperUser extends VIPUser, User{
    broadcast: () =>  void
}
