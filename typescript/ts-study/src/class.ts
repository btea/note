// 类(class)

// 抽象类
// 抽象类作为其他派生类的基类使用，它们一般不会直接被实例化，不同于接口，抽象类可以包含成员的实现细节。  
// abstract 关键字是用于定义抽象类和抽象类内部定义抽象方法。  

abstract class Animal1{
    abstract makeSound(): void;
    move(): void {
        console.log('1223')
    }
}
// 无法创建抽象类的实例
// const animal = new Animal1()   

// 我们不能直接实例化抽象类，通常需要我们创建子类继承基类，然后可以实例化子类。
class Cat extends Animal1 {
    makeSound() {
        console.log('miao')
    }
}
const cat = new Cat()
cat.makeSound()   // miao  
cat.move()  // 1223


// 访问限定符
// 传统面向对象语言通常都有访问限定符，TypeScript中有三类访问限定符，分别是: public、private、protected

// public
// 在 ts 的类中，成员都默认为 public，被此限定符修饰的成员是可以被外部访问到的。
class Car{
    public run() {
        console.log('启动...')
    }
}
const car = new Car()
car.run()   // 启动...  

// private
// 当成员被设置为 private 之后，被此限定符修饰的成员是只可以被类的内部访问。
class Car1{
    private run() {
        console.log('内部启动....')
    }
    start() {
        this.run()
        console.log('start')
    }
}
// Car1.run()
const car1 = new Car1()
car1.start()

// protected
// 当成员被设置为 protected 之后，被此限定符修饰的成员是只可以被类的内部以及类的子类访问。 
class Car2 {
    protected run() {
        console.log('启动2...')
    }
}
class GTR extends Car{
    init() {
        this.run()
    }
}
const car2 = new Car2()
const gtr = new GTR()  
// car2.run()   属性“run”受保护，只能在类“Car2”及其子类中访问。
gtr.init() // 启动2...  
gtr.run()