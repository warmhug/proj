package se._effective_java;

import java.util.Arrays;

/**
 * memory leak
 */
public class MemoryLeak {
    public static void main(String[] args) {
        /*
        内存泄露场景：
        1、类是自己管理内存，要警惕泄露，如 Stack
        2、使用缓存，容易泄露。使用 WeakHashMap 解决
        3、监听器和其他回调，容易泄露。只保存回调的弱引用，将它们保存为 WeakHashMap 中的键
        */
    }
}

class Stack extends IllegalStateException{
    private Object[] elements;
    private int size = 0;
    private static final int DEFAULT_INITIAL_CAPACITY = 16;

    public Stack() {
        elements = new Object[DEFAULT_INITIAL_CAPACITY];
    }

    public void push(Object e) {
        ensureCapacity();
        elements[size++] = e;
    }

    public Object pop() {
        if (size == 0)
            throw new IllegalStateException();
        // return elements[--size];  // 内存泄露
        Object result = elements[--size];
        elements[size] = null;  // 消除内存泄露
        return result;
    }

    /**
     * Ensure space for at least one more element, roughly doubling the capacity
     * each time the array needs to grow.
     */
    private void ensureCapacity() {
        if (elements.length == size)
            elements = Arrays.copyOf(elements, 2 * size + 1);
    }
}
