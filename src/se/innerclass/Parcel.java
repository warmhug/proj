package se.innerclass;

/**
 * Created by hua on 15/9/15.
 */
public class Parcel {
    private class PCont implements Cont {
        private int i = 11;
        public int value() {
            return i;
        }
    }
    protected class PDest implements Dest {
        private String label;
        private PDest(String to) {
            label = to;
        }
        public String readLabel() {
            return label;
        }
    }
    public Dest dest(String s) {
        return new PDest(s);
    }
    public Cont cont() {
        return new PCont();
    }
}
