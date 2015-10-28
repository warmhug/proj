package se;

public class Base {

    // 判断奇数
    public boolean oddOrNot(int num) {
        // 不对，考虑 负奇数
        //return num % 2 == 1;
        return (num & 1) != 0;
    }

    public static void main(String[] args) {

        Base base = new Base();

        System.out.println(base.oddOrNot(1));
        System.out.println(base.oddOrNot(-4));
        System.out.println(base.oddOrNot(-5));
    }
}
