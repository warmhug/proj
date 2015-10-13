package se.innerclass;

/**
 * Created by hua on 15/9/15.
 */
public class ParcelTest {
    public static void main(String[] args) {
        Parcel parcel = new Parcel();
        Cont cont = parcel.cont();
        Dest des = parcel.dest("tes");
    }
}
