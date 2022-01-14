package se.collection;

import java.lang.reflect.Array;
import java.util.*;
import java.util.Map.Entry;

public class Base {
	public static void main(String[] args) {
        testArrayToCollection();
        System.out.println("========");

        testHashMap();
        System.out.println("========");

        testArrayList();
        System.out.println("========");

        testHashSet();
        System.out.println("========");

        testTreeSet();
        System.out.println("========");

	}

    public static void testArrayToCollection() {
        int n = 5;
        String[] name = new String[n];
        for(int i = 0; i < n; i++){
            name[i] = String.valueOf(i);
        }

        // 数组转集合
        List<String> list = Arrays.asList(name);

        System.out.println();
        for(String li: list){
            System.out.print(li + " ");
        }

        //集合转数组
        String[] s1 = list.toArray(new String[0]);
        for(int i = 0; i < s1.length; ++i){
            String contents = s1[i];
            System.out.print(contents);
        }

        List list1 = Arrays.asList("one Two three Four five six".split(" "));
        Collections.rotate(list1, 3);
        System.out.println("rotate: " + list1);
        System.out.println("最大值: " + Collections.max(list1));
        System.out.println("最小值: " + Collections.min(list1));
        Collections.replaceAll(list1, "one", "hundread");
        System.out.println("replaceAll: " + list1);

        List sublist = Arrays.asList("three Four".split(" "));
        System.out.println("indexOfSubList: " + Collections.indexOfSubList(list1, sublist));
        System.out.println("lastIndexOfSubList: " + Collections.lastIndexOfSubList(list1, sublist));

    }

    public static void testHashMap() {
        /*
         Map(映射): 是一种把键对象和值对象映射的集合，它的每一个元素都包含一对键对象和值对象。
         标准的Java类库中包含了几种不同的Map：HashMap, TreeMap, LinkedHashMap, WeakHashMap, IdentityHashMap。
         它们都有同样的基本接口Map，但是行为、效率、排序策略、保存对象的生命周期和判定“键”等价的策略等各不相同。
         Map有内置的排序，因而不关心元素添加的顺序。如果添加元素的顺序对你很重要，应该使用 LinkedHashSet或者LinkedHashMap.
            - HashMap：Map基于散列表的实现。插入和查询“键值对”的开销是固定的。
            - LinkedHashMap：迭代遍历它时，取得“键值对”的顺序是其插入次序，只比HashMap慢一点。
            - TreeMap：基于红黑树数据结构的实现。查看“键”或“键值对”时，它们会被排序(次序由Comparabel或Comparator决定)。
         */
        HashMap<String, String> maps = new HashMap<String, String>();
        maps.put("1", "1st");
        maps.put("2", "2nd");
        maps.put("3", "3rd");
        Collection cl = maps.values();
        Iterator itr = cl.iterator();
        while (itr.hasNext()) {
            System.out.println(itr.next());
        }

        // 使用 entrySet() 遍历
        Set<Entry<String, String>> set = maps.entrySet();
        for (Entry<String, String> entry : set) {
            String key = entry.getKey();
            String value = entry.getValue();
            System.out.println(key + " : " + value);
        }
        // 取得迭代器遍历出对应的值。
        Iterator<Entry<String, String>> it = set.iterator();
        while (it.hasNext()) {
            Map.Entry<String, String> entry = (Entry<String, String>) it.next();
            String key = entry.getKey();
            String value = entry.getValue();
            System.out.println(key + " : " + value);
        }

        // 使用 keySet() 遍历
        Set<String> set1 = maps.keySet();
        for (String s : set1) {
            String key = s;
            String value = maps.get(s);
            System.out.println(key + " : " + value);
        }
        // 取得迭代器遍历出对应的值
        Iterator<String> it1 = set1.iterator();
        while (it.hasNext()) {
            String key = it1.next();
            String value = maps.get(key);
            System.out.println(key + " : " + value);
        }

    }

    public static void testArrayList() {
        /*
         List(列表)： List的特征是其元素以线性方式存储，集合中可以存放重复对象。
         List接口主要实现类包括：
         - ArrayList() 长度可以改变，可以对元素进行随机的访问，插入与删除元素的速度慢，访问速度慢。
         - LinkedList() 在实现中采用链表数据结构。插入和删除速度快，访问速度慢。
         （随机选取元素需要在列表中移动，访问越靠近表尾的元素，花费时间越长）
         */
        List<Integer> list = new ArrayList<Integer>();
        for (int i = 0; i < 10; i++)
            list.add(new Integer(i));
        System.out.println("打乱前:");
        System.out.println(list);

        for (int i = 1; i < 3; i++) {
            System.out.println("第" + i + "次打乱：");
            Collections.shuffle(list);
            System.out.println(list);
        }

        // 使用iterator遍历
        Iterator<Integer> it = list.iterator();
        while (it.hasNext()) {
            Integer value = it.next();
            System.out.println(value);
        }

        // 使用传统for循环进行遍历
        for (int i = 0, size = list.size(); i < size; i++) {
            Integer value = list.get(i);
            System.out.println(value);
        }

        // 使用增强for循环进行遍历
        for (Integer value : list) {
            System.out.println(value);
        }
    }

    public static void testHashSet() {
        /*
         Set(集合)： Set是最简单的一种集合。集合中的对象不按特定的方式排序，并且没有重复对象。
         Set判断两个对象相同不是使用==运算符，而是根据equals方法。
         Set接口主要实现了两个实现类：
            - HashSet 按照哈希算法来存取集合中的对象，存取速度比较快
            - TreeSet 实现了SortedSet接口，能够对集合中的对象进行排序
         另外：LinkedHashSet：具有HashSet的查询速度，且内部使用链表维护元素的顺序(插入的次序)
         */
        Set set = new HashSet();
        String s1 = new String("hello");
        String s2 = s1;
        String s3 = new String("hello");
        System.out.println(s1 == s2);
        System.out.println(s1.equals(s2));
        System.out.println(s3 == s2);
        System.out.println(s3.equals(s2));
        set.add(s1);
        set.add(s2);
        set.add(s3);
        System.out.println(set.size());

        Iterator iterator = set.iterator();
        while (iterator.hasNext()){
            System.out.print(iterator.next() + " ");
        }
    }

    public static void testTreeSet() {
        String[] coins = { "Penny", "nickel", "dime", "Quarter", "dollar" };
        Set set = new TreeSet();
        for (int i = 0; i < coins.length; i++)
            set.add(coins[i]);
        System.out.println(Collections.min(set));
        System.out.println(Collections.min(set, String.CASE_INSENSITIVE_ORDER));
        for(int i=0;i<=10;i++)
            System.out.print("-");
        System.out.println("");
        System.out.println(Collections.max(set));
        System.out.println(Collections.max(set, String.CASE_INSENSITIVE_ORDER));
    }

    public static void test() {}
}
