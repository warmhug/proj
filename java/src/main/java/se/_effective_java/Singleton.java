package se._effective_java;

/**
 * 实现singleton
 */
public class Singleton {
    public static void main(String[] args) {
        // 方法一：公有静态final域。
        S1 s1 = S1.INSTANCE;
        s1.leaveTheBuilding();

        // 方法二：公有域方法。灵活、容易被修改，比如改成每个线程返回一个唯一实例。
        // 注意序列化方式
        S2 s2 = S2.getInstance();
        s1.leaveTheBuilding();

        // 方法三：包含单个元素的枚举类型。自动提供序列化机制，绝对防止多次实例化。最佳方法
        S3 s3 = S3.INSTANCE;
        s3.leaveTheBuilding();
    }
}
class S1 {
    public static final S1 INSTANCE = new S1();
    private S1() {}
    public void leaveTheBuilding() {
        System.out.println("Whoa baby, I'm outta here!");
    }
    private Object readResolve() {
        // Return the one true S1 and let the garbage collector
        // take care of the S1 impersonator.
        return INSTANCE;
    }
}
class S2 {
    private static final S2 INSTANCE = new S2();
    private S2() {
        throw new AssertionError();
    }
    public static S2 getInstance() {
        return INSTANCE;
    }
    public void leaveTheBuilding() {
        System.out.println("Whoa baby, I'm outta here!");
    }
}
enum S3 {
    INSTANCE;
    public void leaveTheBuilding() {
        System.out.println("Whoa baby, I'm outta here!");
    }
}
