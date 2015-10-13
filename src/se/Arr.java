package se;

import java.io.UnsupportedEncodingException;

/**
 * Created by hua on 15/9/21.
 */
public class Arr {
    public static void main(String[] args) throws UnsupportedEncodingException {

        byte[] b = new byte[0];
        try {
            b = Character.toString((char) 1230).getBytes("UTF-8");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        for (int i = 0; i < b.length; i++) {
            System.out.println(b[i]);
        }
        System.out.println(b.length);

    }
}
