package se;

/**
 * Created by hua on 15/9/15.
 */
class A {}
public class Args {

    static void printArray(Object[] args) {
        for(Object arg : args) {
            System.out.print(arg + " ");
        }
        System.out.println();
    }

    // 自动展开参数
    static void printArray1(Object... args) {
        for(Object arg : args) {
            System.out.print(arg + " ");
        }
        System.out.println();
    }
    static void f(Character... args) {
        System.out.print(args.getClass());
        System.out.println(" length " + args.length);
    }
    static void g(int... args) {
        System.out.print(args.getClass());
        System.out.println(" length " + args.length);
    }

    // 重载
    static void f(Integer... args) {
        System.out.println("overload f");
        for(Integer i : args) {
            System.out.print(" " + i);
        }
        System.out.println();
    }

    public static void main(String[] args) {
        printArray(new Object[]{
            new Integer(45), new Float(3.4), new Double(11.11)
        });
        printArray(new Object[]{"one", "two", "three"});
        printArray(new Object[]{new A(), new A()});

        System.out.println("=========");

        printArray1(new Integer(45), new Float(3.4), new Double(11.11));
        printArray1(45, 3.4F, 11.11);
        printArray1("one", "two", "three");
        // 强制类型转换，把 Integer 数组 转换为 Object 数组，也能被自动展开
        printArray1((Object[])new Integer[]{1, 2, 3, 4});

        System.out.println("=========");
        f('a');
        // f();
        f(1);
        g(1);
        g();
        System.out.println("int[]: " + new int[0].getClass());

        System.out.println("=========");

        System.out.println("=========");
    }
}
