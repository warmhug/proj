package se;

/**
 * Created by hua on 15/9/21.
 */
public class Env {
    public static void main(String[] args) {
        System.out.println("=== showProperties: ===");
        System.getProperties().list(System.out);
        System.out.println(System.getProperty("user.name"));
        System.out.println(System.getProperty("java.library.path"));
    }
}
