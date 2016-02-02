package se.reflect;

/**
 * Created by hua on 15/9/21.
 */
public class Reflect {
    public static void main(String[] args) throws ClassNotFoundException {

        System.out.println(Reflect.class);
        System.out.println(Class.forName("se.reflect.Reflect"));

        String str = "abc";
        Class<?> clz = str.getClass();
        clz = String.class;
        clz = Class.forName("java.lang.String");
        System.out.println(clz);

    }
}
