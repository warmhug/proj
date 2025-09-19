package se.generics;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by hua on 16/1/28.
 */
public class G1 {
    public void inspect(List<String> list) {
        for (String obj : list) {
            System.out.println(obj);
        }
        list.add("1"); //这个操作在当前方法的上下文是合法的。
    }
    public void test() {
        List<String> strs = new ArrayList<String>();
        strs.add("2");
        strs.add("22");
        inspect(strs);
        System.out.println(strs);
    }

    public static void main(String[] args) {
        G1 g1 = new G1();
        g1.test();
    }
}
