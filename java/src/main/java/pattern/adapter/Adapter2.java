package pattern.adapter;

/**
 * 适配器 (对象适配器方式,使用了组合的方式跟被适配对象整合)
 * (相当于usb和ps/2的转接器)
 * @author Administrator
 *
 */
public class Adapter2  implements Target {

	private Adaptee adaptee;

	@Override
	public void handleReq() {
		adaptee.request();
	}

	public Adapter2(Adaptee adaptee) {
		super();
		this.adaptee = adaptee;
	}



}
