package se.io;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;

public class ShellCommandExec {
    public static void main(String[] args) {

        String path = "//Users//hua//Downloads//";
        String gnomeOpenCommand = "open " + path + "xx//InputFile.txt";

        try {
            Runtime rt = Runtime.getRuntime();
            Process processObj = rt.exec(gnomeOpenCommand);

            InputStream stdin = processObj.getErrorStream();
            InputStreamReader isr = new InputStreamReader(stdin);
            BufferedReader br = new BufferedReader(isr);

            String myoutput = "";

            while ((myoutput=br.readLine()) != null) {
                myoutput = myoutput+"\n";
            }
            System.out.println(myoutput);
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }
}
