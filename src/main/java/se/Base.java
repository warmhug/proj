package se;

import java.util.*;

// 栈的实现
class MyStack {
    private int maxSize;
    private long[] stackArray;
    private int top;

    public MyStack(int s) {
        maxSize = s;
        stackArray = new long[maxSize];
        top = -1;
    }

    public void push(long j) {
        stackArray[++top] = j;
    }

    public long pop() {
        return stackArray[top--];
    }

    public long peek() {
        return stackArray[top];
    }

    public boolean isEmpty() {
        return (top == -1);
    }

    public boolean isFull() {
        return (top == maxSize - 1);
    }
}

public class Base {
    public int myPublicInt; // visible to all
    protected myProtectedInt; // visible to subclasses of MyClass and to other members of the mytest.myvisibility package
    int myPackageInt; // visible only to other members of the mytest.myvisibility package
    private int myPrivateInt; // visible only to MyClass objects.
    boolean flag = false;

    public static void main(String[] args) {

        MyStack theStack = new MyStack(10);
        theStack.push(10);
        theStack.push(20);
        theStack.push(30);
        theStack.push(40);
        theStack.push(50);
        while (!theStack.isEmpty()) {
            long value = theStack.pop();
            System.out.print(value);
            System.out.print(" ");
        }
        System.out.println("");

        testVector();
        testString();

        Base base = new Base();
        System.out.println(base.oddOrNot(1));
        System.out.println(base.oddOrNot(-4));
        System.out.println(base.oddOrNot(-5));
    }

    private static void testVector() {
        Vector v = new Vector();
        v.add("X");
        v.add("M");
        v.add("D");
        v.add("A");
        v.add("O");
        Collections.sort(v);
        System.out.println(v);
        // 获取向量元素的索引值
        int index = Collections.binarySearch(v, "D");
        System.out.println("元素索引值为 : " + index);
    }

    public static void testString() {
        // StringBuffer
        String string="abcdef";
        String reverse = new StringBuffer(string).reverse().toString();
        System.out.println("String after reverse: " + reverse);

        String str = "www-runoob-com";
        String delimeter = "-";  // 指定分割字符
        String[] temp = str.split(delimeter); // 分割字符串
        for(String x :  temp) {
            System.out.println(x);
        }

        System.out.println("=========================");

        String first_str = "Welcome to Microsoft";
        String second_str = "I work with microsoft";
        boolean match1 = first_str.regionMatches(11, second_str, 12, 9);
        boolean match2 = first_str.regionMatches(true, 11, second_str, 12, 9); //忽略大小写区别
        System.out.println("区分大小写返回值：" + match1);
        System.out.println("不区分大小写返回值：" + match2);

        System.out.println("=========================");

        double e = Math.E;
        System.out.format("%f%n", e);
        System.out.format(Locale.GERMANY, "%-10.4f%n%n", e);  //指定本地为德国（GERMANY）

        System.out.println("=========================");

        System.out.println("=========================");

        System.out.println("=========================");

        System.out.println("=========================");
    }

    // 判断奇数
    public boolean oddOrNot(int num) {
        // 不对，考虑 负奇数
        //return num % 2 == 1;
        return (num & 1) != 0;
    }



}
