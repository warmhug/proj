package se;

import java.lang.reflect.Field;

public class DataTypes {

    static void getInfo(String pri, Class<? extends Number> clazz) throws Exception{
        System.out.println(clazz);
        System.out.println("基本类型(Primitive Data Types)：" + pri + " 二进制位数：" +  getEntity(clazz, "SIZE"));
        System.out.println("包装类：" + clazz);
        System.out.println("最小值：" + clazz + ".MIN_VALUE=" + getEntity(clazz, "MIN_VALUE"));
        System.out.println("最大值：" + clazz + ".MAX_VALUE=" + getEntity(clazz, "MAX_VALUE"));
        System.out.println();
    }

    private static String getEntity(Class<? extends Number> clazz, String name) throws NoSuchFieldException, IllegalAccessException {
        Field field = clazz.getDeclaredField(name);
        return field.get(null).toString();
    }


    public static void main(String[] args) throws Exception {
        getInfo("byte", Byte.class);
        getInfo("short", Short.class);
        getInfo("int", Integer.class);
        getInfo("long", Long.class);
        getInfo("double", Double.class);
        //getInfo("char", Character.class);

        byte a0 = 123;
        short a1 = 1234;
        int a2 = 12345;

        //整型常量默认类型是int。转为long类型要加 L 后缀
        long a3 = 123456789112L;

        double d = 3.14;
        //浮点数常量默认类型是double。转为float类型要加 F 后缀
        float d1 = 3.14F;

        //浮点数存在舍入误差，不是精确的数字
        float f = 0.1f;
        double dd = 1.0/10;
        System.out.println(f == dd); //false


        //单引号用来表示字符常量，例如 'se.A' 是一个字符。与 "se.A" 是不同的，它表示含有一个字符的字符串。
        //char类型用来表示在Unicode编码表中的字符。
        //char是在0-65535范围，运算时直接当做整数来运算。
        //可以把0-65535之间的整数直接转换为char
        char c = 'a';
        int i = c + 2;
        char c1 = (char)i;

        //类型提升问题
        int a = 3;
        long b = 4;
        double dou = 5.4;
        int ca = (int)(a + b);
        float ff = (float)(a + dou);

        int money = 1000000000;  //10亿
        int years = 20;
        long total0 = (long)(money * years); //返回负数，错误
        long total = (long)money * years;  //需要把money提升为long类型，正确


    }
}
