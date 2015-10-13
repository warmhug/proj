package se;

import java.util.Map;

/**

 一般Java中，使用变量E表示集合元素类型。K表示关键字，V表示值。T（或者U、S）表示"任意类型"。

 当一个变量被声明为泛型时，只能被实例变量、方法和内部类调用，而不能被静态变量和静态方法调用。
 因为静态成员是被所有参数化的类所共享的，所以静态成员不应该有类级别的类型参数。
 若使用需要是静态泛型方法，则重新声明泛型参数。

 */

class Box<T> {
    private T t;
    public void add(T t) {
        this.t = t;
    }
    public T get() {
        return t;
    }
    /**
     * 静态方法。静态方法不可以访问类上定义的泛型。重新声明T，此处的 T 与 se.Box<T> 的 T 没有关系（可以没有Box<T>的T）。
     */
    public static <T> void update(T obj){
    }
    public static <K, V> V getValue(Map<K,V> map,K key) {
        return map.get(key);
    }
    /**
     * 在方法中对泛型类型实例化，则需要传入Class<T>
     */
    public static <T> void makePair(Class<T> cl) throws InstantiationException, IllegalAccessException {
        T t = cl.newInstance();
    }
}

public class Generics {
    // 泛型方法
    public static <E> void printArray(E[] inputArray) {
        for (E ele : inputArray) {
            System.out.printf("%s ", ele);
        }
        System.out.println();
    }

    // 比较三个值，返回最大值
    public static <E extends Comparable<E>> E max(E x, E y, E z) {
        E max = x;
        if (y.compareTo(max) > 0) {
            max = y;
        }
        if (z.compareTo(max) > 0) {
            max = z;
        }
        return max;
    }

    static <T> T method(T x,T y) {
        return null;
    }

    public static void main(String[] args) {
        Integer[] intArray = {1, 2, 3};
        Double[] doubleArray = {1.1, 2.1, 3.1};
        Character[] charArray = {'h', 'i', 'j'};
        printArray(intArray);
        printArray(doubleArray);
        printArray(charArray);

        System.out.println("============");

        System.out.printf("max of %d, %d and %d is %d\n\n", 3, 4, 5, max(3, 4, 5));
        System.out.printf("max of %.1f, %.1f and %.1f is %.1f\n\n", 3.3, 4.4, 5.5, max(3.3, 4.4, 5.5));
        System.out.printf("max of %s, %s and %s is %s\n\n", "peer", "apple", "orange", max("peer", "apple", "orange"));

        System.out.println("=============");

        // 泛型类型推断
        Integer i = method(1,2); //1与2都是Integer，所以返回Integer
        Double d = method(1.2,2.3); //1.2，2.3默认都是Double，所以返回Double
        Number n = method(1.2,2); //1.2是Double，2是Integer，两者均能匹配Number。返回Number。
        Object o = method(1.2,"2"); //1.2是Double,"2"是String，这者均能匹配Object。返回Object。

        System.out.println("=============");

        Box<Integer> integerBox = new Box<Integer>();
        Box<String> stringBox = new Box<String>();

        integerBox.add(new Integer(10));
        stringBox.add(new String("Hello World"));

        System.out.printf("Integer Value :%d\n\n", integerBox.get());
        System.out.printf("String Value :%s\n", stringBox.get());
    }
}
