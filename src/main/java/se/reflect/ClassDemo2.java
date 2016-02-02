package se.reflect;

import java.lang.reflect.Constructor;

public class ClassDemo2 {
	public static void main(String[] args) {

		Class c1 = int.class;//int 的类类型
		Class c2 = String.class;//String类的类类型   String类字节码（自己发明的)
		Class c3 = double.class;
		Class c4 = Double.class;
		Class c5 = void.class;

		System.out.println(c1.getName());
		System.out.println(c2.getName());
		System.out.println(c2.getSimpleName());//不包含包名的类的名称
		System.out.println(c3);
		System.out.println(c4);
		System.out.println(c5.getName());


		int[] arr01 = new int[10];
		int[][] arr02 = new int[30][3];
		int[] arr03 = new int[30];
		double[] arr04 = new double[10];

		System.out.println(arr01.getClass().hashCode());
		System.out.println(arr02.getClass().hashCode());
		System.out.println(arr03.getClass().hashCode());
		System.out.println(arr04.getClass().hashCode());


		Class clazz = null;
		try {
			clazz = Class.forName("se.reflect.User");

			Constructor[] constructors = clazz.getDeclaredConstructors();
			Constructor c = clazz.getDeclaredConstructor(int.class,int.class,String.class);
			System.out.println("c"+c);
			for(Constructor temp:constructors){
				System.out.println("t"+temp);
			}


		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (NoSuchMethodException e) {
			e.printStackTrace();
		}


	}

}
