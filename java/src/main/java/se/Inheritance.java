package se;

class Animal {
    public void eat(){
        System.out.println("吃");
    }
}
class Dog extends Animal {
    public void eat(){
        System.out.println("狗吃肉");
    }
    public void watchDoor(){
        System.out.println("看门");
    }
}
class Cat extends Animal {

}

public class Inheritance {

	public static void main(String[] args) {

        Animal obj1 = new Animal();
        obj1.eat();
        //多态，父类引用指向之类对象
        Animal obj2 = new Dog();
        //方法多态，调用的是子类方法
        obj2.eat();
        // obj2.watchDoor();
        Animal obj3 = new Cat();
        obj3.eat();

        System.out.println("========");

        //强制类型转换
        Dog dog = new Dog();
        Animal animal = dog;
        Dog dog1 = (Dog)animal;
        // oop.se.Cat cat = (oop.se.Cat)animal; //类型转换错误
        if (animal instanceof Cat){
            Cat cat = (Cat)animal;
        } else {
            System.out.println("无法转换类型");
        }
	}
}
