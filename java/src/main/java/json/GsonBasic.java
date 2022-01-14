package json;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by hua on 16/2/17.
 */
public class GsonBasic {
    public static void main(String[] args) {
        testPrimitives();

        Gson gson = new Gson();
        /*
        // 另一种构建方式
        Gson gson = new GsonBuilder()
                .enableComplexMapKeySerialization() //支持Map的key为复杂对象的形式
                .create();
        */

        Student student = new Student();
        student.setId(1);
        student.setName("hua");
        String s1 = gson.toJson(student);
        System.out.println("简单bean转为json: " + s1);
        System.out.println("json转为简单bean：" + gson.fromJson(s1, Student.class));

        List list = new ArrayList<>();
        list.add(student);
        String s2 = gson.toJson(list);
        System.out.println("带泛型的list转化为json==" + s2);

        // json转为带泛型的list
        List<Student> retList = gson.fromJson(s2,
                new TypeToken<List<Student>>() {
                }.getType());
        for (Student stu : retList) {
            System.out.println(stu);
        }
    }

    private static void testPrimitives() {
        // Serialization
        Gson gson = new Gson();
        gson.toJson(1);            // ==> 1
        gson.toJson("abcd");       // ==> "abcd"
        gson.toJson(new Long(10)); // ==> 10
        int[] values = { 1 };
        gson.toJson(values);       // ==> [1]

        // Deserialization
        int one = gson.fromJson("1", int.class);
        Integer one1 = gson.fromJson("1", Integer.class);
        Long one2 = gson.fromJson("1", Long.class);
        Boolean false1 = gson.fromJson("false", Boolean.class);
        String str = gson.fromJson("\"abc\"", String.class);
    }
}
