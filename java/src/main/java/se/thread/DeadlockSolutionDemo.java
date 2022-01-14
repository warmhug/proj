package se.thread;

public class DeadlockSolutionDemo {
    public static Object addLock = new Object();
    public static Object subLock = new Object();

    public static void main(String args[]) {

        MyAdditionThread add = new MyAdditionThread();
        MySubtractionThread sub = new MySubtractionThread();
        add.start();
        sub.start();
    }

    private static class MyAdditionThread extends Thread {
        public void run() {
            synchronized (addLock) {
                int a = 10, b = 3;
                int c = a + b;
                System.out.println("Addition Thread: " + c);
                System.out.println("Holding First Lock...");
                try { Thread.sleep(10); }
                catch (InterruptedException e) {}
                System.out.println("Addition Thread: Waiting for AddLock...");
                synchronized (subLock) {
                    System.out.println("Threads: Holding Add and Sub Locks...");
                }
            }
        }
    }

    private static class MySubtractionThread extends Thread {
        public void run() {
            synchronized (addLock) {
                int a = 10, b = 3;
                int c = a - b;
                System.out.println("Subtraction Thread: " + c);
                System.out.println("Holding Second Lock...");
                try { Thread.sleep(10); }
                catch (InterruptedException e) {}
                System.out.println("Subtraction  Thread: Waiting for SubLock...");
                synchronized (subLock) {
                    System.out.println("Threads: Holding Add and Sub Locks...");
                }
            }
        }
    }
}
