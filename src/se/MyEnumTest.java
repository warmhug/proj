package se;

/**
 * Created by hua on 15/9/15.
 */
public class MyEnumTest {
    MyEnum degree;
    public MyEnumTest(MyEnum degree) {
        this.degree = degree;
    }
    public void des() {
        System.out.println("this is ");
        switch(degree) {
            case A:
                System.out.println("se.A");
                break;
            case B:
                System.out.println("B");
                break;
            default:
                System.out.println("default");
        }
    }

    public static void main(String[] args) {
        MyEnum myEnum = MyEnum.A;
        System.out.println(myEnum);

        for(MyEnum m : MyEnum.values()) {
            System.out.println(m + ". ordinal " + m.ordinal());
        }

        System.out.println("========");

        MyEnumTest myEnumTest = new MyEnumTest(MyEnum.A),
                myEnumTest1 = new MyEnumTest(MyEnum.A_B);

        myEnumTest.des();
        myEnumTest1.des();
    }
}
