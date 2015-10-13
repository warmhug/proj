package se;

import java.util.*;

public class Base1 {
	public static void main(String[] args) {

         /*
         List(列表)： List的特征是其元素以线性方式存储，集合中可以存放重复对象。
         List接口主要实现类包括：
         - ArrayList() 长度可以改变，可以对元素进行随机的访问，插入与删除元素的速度慢，访问速度慢。
         - LinkedList() 在实现中采用链表数据结构。插入和删除速度快，访问速度慢。
         （随机选取元素需要在列表中移动，访问越靠近表尾的元素，花费时间越长）
         */

        System.out.println("========");

        /*
         Set(集合)： Set是最简单的一种集合。集合中的对象不按特定的方式排序，并且没有重复对象。
         Set判断两个对象相同不是使用==运算符，而是根据equals方法。
         Set接口主要实现了两个实现类：
         HashSet 按照哈希算法来存取集合中的对象，存取速度比较快
         TreeSet 实现了SortedSet接口，能够对集合中的对象进行排序
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

        System.out.println("========");

        /*
         Map(映射): 是一种把键对象和值对象映射的集合，它的每一个元素都包含一对键对象和值对象。
         标准的Java类库中包含了几种不同的Map：HashMap, TreeMap, LinkedHashMap, WeakHashMap, IdentityHashMap。
         它们都有同样的基本接口Map，但是行为、效率、排序策略、保存对象的生命周期和判定“键”等价的策略等各不相同。
         Map有内置的排序，因而不关心元素添加的顺序。如果添加元素的顺序对你很重要，应该使用 LinkedHashSet或者LinkedHashMap.
         HashMap：Map基于散列表的实现。插入和查询“键值对”的开销是固定的。
         LinkedHashMap：迭代遍历它时，取得“键值对”的顺序是其插入次序，只比HashMap慢一点。
         TreeMap：基于红黑树数据结构的实现。查看“键”或“键值对”时，它们会被排序(次序由Comparabel或Comparator决定)。
         */

        System.out.println("========");

	}
}