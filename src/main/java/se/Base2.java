package se;

public class Base2 {

    //外部类的私有属性name
    private String name = "imooc";

    //外部类的成员属性
    int age = 20;

    //内部类， 相当于 外部类的一个成员变量
    public class Inner {
        String name = "爱慕课";
        // 内部类的方法
        public void show() {
            System.out.println("welcome to " + name);
            System.out.println("welcome to " + Base2.this.name);
            System.out.println("welcome to " + Base2.this.age);
        }
    }

    // 外部类中的静态变量score
    private static int score = 84;

    // 创建静态内部类
    public  static class SInner {
        // 内部类中的变量score
        int score = 91;

        public void show() {
            System.out.println("访问外部类中的score：" + Base2.score);
            System.out.println("访问内部类中的score：" + score);
        }
    }

    //方法内部类
    //方法内部类就是内部类定义在外部类的方法中，方法内部类只在该方法的内部可见，
    //由于方法内部类不能在外部类的方法以外的地方使用，因此方法内部类不能使用访问控制符和 static 修饰符。
    // 外部类中的show方法
    public void show() {
        // 定义方法内部类
        class MInner {
            int score = 83;
            public int getScore() {
                return score + 10;
            }
        }

        // 创建方法内部类的对象
        MInner mInner = new MInner();

        // 调用内部类的方法
        int newScore = mInner.getScore();
        // Integer newScore = mInner.getScore();

        System.out.println("姓名：" + name + "\n加分后的成绩：" + newScore);
    }

	public static void main(String[] args) {

        //创建外部类对象
        Base2 base2 = new Base2();
        //创建内部类对象
        Inner inner = base2.new Inner();
        inner.show();

        //可以通过对象，调用静态变量或静态方法
        System.out.println("通过对象，调用静态变量或静态方法");
        System.out.println(base2.score);

        //static
        SInner sInner = new SInner();
        sInner.show();

        //method
        base2.show();

        System.out.println("========");

	}
}
