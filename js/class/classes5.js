function Animal(name, weight){
    this.name = name;
    this.weight = weight;
}
Animal.prototype.eat = function(){
    return `${this.name} is eating`;
}
Animal.prototype.sleep = function(){
    return  `${this.name} is going to sleep!`;
}
Animal.prototype.wakeUp = function(){
    return `${this.name} is waking up!`;
}

function Gorilla(name, weight){
    Animal.call(this, name, weight); // 等同于es6  super(name.weight);
}
Gorilla.prototype = Object.create(Animal.prototype);
Gorilla.prototype.constructor = Gorilla;

Gorilla.prototype.climbTrees = function(){
    return `${this.name} is climbing trees!`;
}

Gorilla.prototype.poundChest = function(){
    return `${this.name} is pounding its chest!`;
}

Gorilla.prototype.showVigour = function(){
    return `${Animal.prototype.eat.call(this)} ${this.poundChest()}`;
}

Gorilla.prototype.dailyRoutine = function(){
    return `${Animal.prototype.wakeUp.call(this)} ${this.poundChest()} ${Animal.prototype.eat.call(this)} ${Animal.prototype.sleep.call(this)}`;
}

function display(content){
    console.log(content);
}
var gorilla = new Gorilla('George','160kg');
display(gorilla.poundChest());   // George is pounding its chest!
display(gorilla.sleep());        // George is going to sleep!
display(gorilla.showVigour());   // George is eating George is pounding its chest!
display(gorilla.dailyRoutine()); // George is waking up! George is pounding its chest! George is eating George is going to sleep!