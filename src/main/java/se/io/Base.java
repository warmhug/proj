package se.io;

import java.io.*;

public class Base {
    public static void main(String[] args) {
        File file = new File("//Users//hua//Downloads/");
        String[] files = file.list();

        System.out.println("Listing contents of " + file.getPath());
        for (int i=0 ; i < files.length ; i++) {
            System.out.println(files[i]);
        }
    }
}
