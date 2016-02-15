package pattern.prototype;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.util.Date;

/**
 * 原型模式(深复制,使用序列化和反序列化的方式实现深复制)
 * @author 尚学堂高淇www.sxt.cn
 *
 */
public class Client3 {
	public static void main(String[] args) throws CloneNotSupportedException, Exception {
		Date date = new Date(12312321331L);
		Sheep s1 = new Sheep("少利",date);
		System.out.println(s1);
		System.out.println(s1.getSname());
		System.out.println(s1.getBirthday());


//		使用序列化和反序列化实现深复制
		ByteArrayOutputStream bos = new ByteArrayOutputStream();
		ObjectOutputStream    oos = new ObjectOutputStream(bos);
		oos.writeObject(s1);
		byte[] bytes = bos.toByteArray();

		ByteArrayInputStream  bis = new ByteArrayInputStream(bytes);
		ObjectInputStream	  ois = new ObjectInputStream(bis);

		Sheep s2 = (Sheep) ois.readObject();   //克隆好的对象！

		System.out.println("修改原型对象的属性值");
		date.setTime(23432432423L);

		System.out.println(s1.getBirthday());

		s2.setSname("多利");
		System.out.println(s2);
		System.out.println(s2.getSname());
		System.out.println(s2.getBirthday());


	}
}
