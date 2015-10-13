package se.annotation;

import java.lang.annotation.Annotation;
import java.lang.reflect.Field;


public class Demo03 {

	public static void main(String[] args) {
		try {
			Class clazz = Class.forName("se.annotation.SxtStudent");

			Annotation[] annotations=clazz.getAnnotations();
			for (Annotation a : annotations) {
				System.out.println(a);
			}

			SxtTable st = (SxtTable) clazz.getAnnotation(SxtTable.class);
			System.out.println(st.value());


			Field f = clazz.getDeclaredField("studentName");
			SxtField sxtField = f.getAnnotation(SxtField.class);
			System.out.println(sxtField.columnName()+"--"+sxtField.type()+"--"+sxtField.length());

		} catch (Exception e) {
			e.printStackTrace();
		}

	}
}
