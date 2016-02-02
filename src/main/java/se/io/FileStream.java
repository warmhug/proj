package se.io;

import java.io.*;

public class FileStream {
    public static void main(String args[]) throws IOException {
        FileInputStream in = null;
        FileOutputStream out = null;

        String path = "//Users//hua//Downloads//";

        try {
            in = new FileInputStream(path + "xx//InputFile.txt");
            out = new FileOutputStream(path + "xx//OutputFile.txt");

            int c;
            while((c = in.read()) != -1) {
                out.write(c);
            }
        } finally {
            if(in != null) {
                in.close();
            }
            if(out != null) {
                out.close();
            }
        }
    }
}
