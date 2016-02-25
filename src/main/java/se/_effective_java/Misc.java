package se._effective_java;

import java.util.Calendar;
import java.util.Date;
import java.util.TimeZone;

/**
 * 各种
 */
public class Misc {
    public static void main(String[] args) {
        // new String 每次执行的时候，都创建一个新的String实例。浪费空间
        String s = new String("ss");
        // 这样只有一个String实例
        String s1 = "ss";

        // 转 bool 做法
        // 静态工厂方法 Boolean.valueOf 不会每次创建新对象，总是优先于构造器 new Boolean 调用，new会每次都创建新对象
        Boolean b = Boolean.valueOf("bool");
        Boolean b1 = new Boolean("bool");

        long start = System.currentTimeMillis();
        // Long sum = 0L;  // 使用 Long 每次循环都要自动装箱，构造非常多的 Long 实例，耗时耗空间。
        long sum = 0L;
        for (long i = 0; i < Integer.MAX_VALUE; i++) {
            sum += i;
        }
        System.out.println(sum);
        System.out.println(System.currentTimeMillis() - start);
    }
}

class Person {
    private final Date birthDate;
    public Person(Date birthDate) {
        this.birthDate = new Date(birthDate.getTime());
    }
    /**
     * The starting and ending dates of the baby boom.
     */
    private static final Date BOOM_START;
    private static final Date BOOM_END;
    // 静态块，只用构造一次 Calendar Date 对象。
    static {
        Calendar gmtCal = Calendar.getInstance(TimeZone.getTimeZone("GMT"));
        gmtCal.set(1946, Calendar.JANUARY, 1, 0, 0, 0);
        BOOM_START = gmtCal.getTime();
        gmtCal.set(1965, Calendar.JANUARY, 1, 0, 0, 0);
        BOOM_END = gmtCal.getTime();
    }

    public boolean isBabyBoomer() {
        return birthDate.compareTo(BOOM_START) >= 0
                && birthDate.compareTo(BOOM_END) < 0;
    }
}
