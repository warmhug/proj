package se.innerclass;

/**
 * Created by hua on 16/1/27.
 */
public class Outer {
    public static void main(String[] args) {
        Outer outer = new Outer();
        Outer.Inner inner = outer.new Inner();
        inner.print("Outer.new");

        inner = outer.getInner();
        inner.print("Outer.get");
    }

    // 个人推荐使用getxxx()来获取成员内部类，尤其是该内部类的构造函数无参数时
    public Inner getInner() {
        return new Inner();
    }

    public class Inner {
        public void print(String str) {
            System.out.println(str);
        }
    }

    public void dosome(final String a, final int b) {
        class Dosome {
            public void dosome(){ System.out.println(a + b); }
        }
        Dosome some = new Dosome();
        some.dosome();

        // 为什么形参要定义为final呢？这是一个编译器设计的问题
        // 内部类，编译器编译以后实际的代码是
        /*
        class Outer$Dosome {
            public Dosome(final String a,final int b){
                this.Dosome$a=a;
                this.Dosome$b=b;
            }
            public void dosome(){
                System.out.println(this.Dosome$a + this.Dosome$b);
            }
        }}
        */
    }

}
