package pattern.singleton;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;

/**
 * 测试反射和反序列化破解单例模式
 * @author 尚学堂高淇 www.sxt.cn
 *
 */
public class Client2 {

	public static void main(String[] args) throws Exception {
		SingletonDemo6 s1 = SingletonDemo6.getInstance();
		SingletonDemo6 s2 = SingletonDemo6.getInstance();

		System.out.println(s1);
		System.out.println(s2);

		//通过反射的方式直接调用私有构造器
//		Class<SingletonDemo6> clazz = (Class<SingletonDemo6>) Class.forName("com.bjsxt.singleton.SingletonDemo6");
//		Constructor<SingletonDemo6> c = clazz.getDeclaredConstructor(null);
//		c.setAccessible(true);
//		SingletonDemo6  s3 = c.newInstance();
//		SingletonDemo6  s4 = c.newInstance();
//		System.out.println(s3);
//		System.out.println(s4);

		//通过反序列化的方式构造多个对象
		FileOutputStream fos = new FileOutputStream("d:/a.txt");
		ObjectOutputStream oos = new ObjectOutputStream(fos);
		oos.writeObject(s1);
		oos.close();
		fos.close();

		ObjectInputStream ois = new ObjectInputStream(new FileInputStream("d:/a.txt"));
		SingletonDemo6 s3 =  (SingletonDemo6) ois.readObject();
		System.out.println(s3);


	}
}
