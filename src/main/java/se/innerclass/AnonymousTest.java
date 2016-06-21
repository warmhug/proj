package se.innerclass;

/**
 * 匿名内部类
 *
 * 使用匿名内部类我们必须要继承一个父类或者实现一个接口，当然也仅能只继承一个父类或者实现一个接口。
 * 匿名内部类中不能定义构造函数，不能存在任何的静态成员变量和静态方法。
 *
 * 匿名内部类不能是抽象类，所以它必须要实现它的抽象父类或者接口里面所有的抽象方法。
 *
 * 匿名内部类的使用它是存在一个缺陷的，就是它仅能被使用一次，创建匿名内部类时它会立即创建一个该类的实例，该类的定义会立即消失，
 * 所以匿名内部类是不能够被重复使用。
 *
 * new 父类构造器（参数列表）| 接口（）
     {
     // 匿名内部类的类体部分
     }

   匿名内部类怎么执行? (个人理解)如下执行顺序: 2 - 3 - 1
    1. new - 用于创建匿名内部类的对象
    2. 父类构造器（参数列表）| 接口（）- 继承的父类或实现的接口
    3. { } - 匿名内部类的类体
 */

interface Person {
    public void eat();
}

abstract class Bird {
    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public abstract int fly();
}

public class AnonymousTest {
    public void test(Bird bird){
        System.out.println(bird.getName() + "能够飞 " + bird.fly() + "米");
    }
    public static void main(String[] args) {

        // 实现接口
        Person p = new Person() {
            public void eat() {
                System.out.println("eat something");
            }
        };
        p.eat();
        // 相当于
        /*
        class Child implements Person {
            public void eat() {
                System.out.println("eat something");
            }
        }
        Person p = new Child();
        p.eat();
        */

        // 实现父类（抽象类）
        AnonymousTest test = new AnonymousTest();
        test.test(new Bird() {
            public int fly() {
                return 10000;
            }

            public String getName() {
                return "大雁";
            }
        });
        // 相当于
        /*
        public class WildGoose extends Bird{
            public int fly() {
                return 10000;
            }
            public String getName() {
                return "大雁";
            }
        }
        WildGoose wildGoose = new WildGoose();
        test.test(wildGoose);
        */

        // 最常用的情况就是在多线程的实现上，
        // 实现多线程必须继承 Thread 类或是继承 Runnable 接口
        Thread t = new Thread() {
            public void run() {
                for (int i = 1; i <= 5; i++) {
                    System.out.print(i + " ");
                }
            }
        };
        t.start();

        new Thread(new Runnable() {
            public void run() {
                for (int i = 1; i <= 5; i++) {
                    System.out.print(i + " ");
                }
            }
        }).start();
    }
}
