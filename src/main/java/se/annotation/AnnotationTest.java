package se.annotation;

import java.lang.annotation.*;

public class AnnotationTest {

    @Target(ElementType.TYPE_USE)
    @Retention(RetentionPolicy.RUNTIME)
    @interface First { }

    @Target(ElementType.TYPE_USE)
    @Retention(RetentionPolicy.RUNTIME)
    @interface Second { }

    class A { }

    class B extends @First @Second A { }

    public static void main(String[] args) {
        Annotation[] anns = B.class.getAnnotatedSuperclass().getAnnotations();
        System.out.printf("There are %d annotations on B's use of its superclass.%n", anns.length);
        for (Annotation a : anns)
            System.out.println(a.annotationType().getName());
    }
}
