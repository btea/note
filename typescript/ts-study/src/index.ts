function gretter(person: string): string{
    return 'hello ' + person
}

const sym1 = Symbol('key1')
const sym2 = Symbol('key1')

// 在tsconfig.json里面strictNullChecks属性设置为false时，b/c/d的赋值不会报错，如果设置为true或者注释，b/c/d的赋值会报错
const a: void = undefined
const b: void = null
const c: null = undefined
const d: undefined = null

// 抛出异常的函数永远不会有返回值
function error(message: string): never{
    throw new Error(message)
}
let empty: never[]

// const empty: never[] = [];  // 报错 ？？
const list: Array<number> = [1, 2]
const list1: number[] = [1]

  


