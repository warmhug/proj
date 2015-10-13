package se.classLoader;

public class Demo01 {
    public static void main(String[] args) throws Exception {

        System.out.println(ClassLoader.getSystemClassLoader());
        System.out.println(ClassLoader.getSystemClassLoader().getParent());
        System.out.println(ClassLoader.getSystemClassLoader().getParent().getParent());   //JAVA_HOME/jre/lib/rt.jar
        System.out.println(System.getProperty("java.class.path"));

        System.out.println("################");
        String a = "gaogao";
        System.out.println(a.getClass().getClassLoader());
        System.out.println(a);


        ClassLoader loader = Demo01.class.getClassLoader();
        System.out.println(loader);


        ClassLoader loader2 = Thread.currentThread().getContextClassLoader();
        System.out.println(loader2);

        Class<Demo01> c = (Class<Demo01>) Thread.currentThread().getContextClassLoader().loadClass("se.classLoader.Demo01");
        System.out.println(c);
        System.out.println(c.getClassLoader());


        System.out.println("===========");

        FileSystemClassLoader loader1 = new FileSystemClassLoader("/Users/hua/my/java/base");
        Class<?> c4 = loader2.loadClass("java.lang.String");
        Class<?> c5 = loader2.loadClass("se.classLoader.Demo01");
        System.out.println(c4.hashCode());
        System.out.println(c4.getClassLoader());
        System.out.println(c5.getClassLoader());

    }
}
