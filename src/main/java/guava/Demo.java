package guava;

import com.google.common.base.Joiner;
import com.google.common.base.Splitter;
import com.google.common.collect.ImmutableMap;

import java.util.*;

/**
 * Created by hua on 16/2/3.
 */
public class Demo {

    // 初始化 arraylist 的方法：http://stackoverflow.com/questions/1005073/initialization-of-an-arraylist-in-one-line
    static List<String> list = new ArrayList<String>(Arrays.asList("1", "2", null, "3"));

    public static void main(String[] args) {
        System.out.println(rawJoin(list, ","));
        System.out.println(joinByGuava(list, ","));
        System.out.println(createParams());

        Map<String, String> map = splitParams("id=123&name=green");
        Iterator iterator = map.entrySet().iterator();
        while (iterator.hasNext()) {
            Map.Entry pair = (Map.Entry) iterator.next();
            System.out.println(pair.getKey() + " = " + pair.getValue());
        }
    }

    private static Map<String, String> splitParams(String s) {
        return Splitter.on("&").withKeyValueSeparator("=").split(s);
    }

    private static String createParams() {
        return Joiner.on("&").withKeyValueSeparator("=").join(ImmutableMap.of("id", "123", "name", "green"));
    }

    private static String rawJoin(List stringList, String delimiter) {
        StringBuilder builder = new StringBuilder();
        for (Object item : stringList) {
            if (item != null) {
                builder
                    .append(item)
                    .append(delimiter);
            }
        }
        builder.setLength(builder.length() - delimiter.length());
        return builder.toString();
    }

    public static String joinByGuava(List stringList, String delimiter) {
        return Joiner
                .on(delimiter)
                .skipNulls()
                .join(stringList);
    }




}
