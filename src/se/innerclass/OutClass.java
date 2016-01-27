package se.innerclass;

/**
 * Created by hua on 16/1/27.
 */
abstract class InnerClass {
//    InnerClass(String name, String age) {
//        System.out.println(age);
//    }

    abstract String getName();
}
public class OutClass {
    // 当所在的方法的形参需要被内部类里面使用时，该形参必须为final
    public InnerClass getInnerClass(final int age, final String name){
        return new InnerClass() {
            int age_ ;
            String name_;
            //构造代码块完成初始化工作
            {
                if(0 < age && age < 200){
                    age_ = age;
                    name_ = name;
                }
            }
            public String getName() {
                return name_;
            }

            public int getAge() {
                return age_;
            }
        };
    }

    public static void main(String[] args) {
        OutClass out = new OutClass();

        InnerClass inner_1 = out.getInnerClass(201, "chenssy");
        System.out.println(inner_1.getName());

        InnerClass inner_2 = out.getInnerClass(23, "chenssy");
        System.out.println(inner_2.getName());
    }
}
