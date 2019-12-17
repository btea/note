class Animal{
    constructor(name, weight){
        this.name = name;
        this.weight = weight;
    }
    eat(){
        return `${this.name} is eating`;
    }
    sleep(){
        return `${this.name} is going to sleep!`;
    }
    wakeUp(){
        return `${this.name} is waking up!`;
    }
}

class Gorilla extends Animal{
    constructor(name, weight){
        super(name,weight); 
        // the super keyword is used as a "function" which calls the parent class Animal with the parameters passed to Gorilla. 
        // This is a key step to be carried out in order to make sure that Gorilla is an instance of Animal.
    }
    climbTrees(){
        return `${this.name} is climbing trees!`;
    }
    poundChest(){
        // console.log(this);
        return `${this.name} is pounding its chest!`;
    }
    showVigour(){
        return `${super.eat()} ${this.poundChest()}`;
        // super is used as an "object" which refers to an Animal instance(parent class).
        // The super keyword here is used to call the methods of the parent class Animal explicitly.
    }
    dailyRoutine(){
        return `${super.wakeUp()} ${this.poundChest()} ${super.eat()} ${super.sleep()}`;
    }
}
function display(content){
    console.log(content);
}
const gorilla = new Gorilla('George','160kg');

display(gorilla.poundChest());   // George is pounding its chest!
display(gorilla.sleep());        // George is going to slepp!
display(gorilla.showVigour());   // George is eating George is pounding its chest!
display(gorilla.dailyRoutine()); // George is waking up! George is pounding its chest! George is eating George is going to sleep!