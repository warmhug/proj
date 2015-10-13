package se.reflect;

import java.lang.reflect.Method;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.List;
import java.util.Map;

public class ClassDemo3 {

	public void test01(Map<String,User> map, List<User> list){
		System.out.println("Demo04.test01()");
	}

	public Map<Integer,User> test02(){
		System.out.println("Demo04.test02()");
		return null;
	}

	public static void main(String[] args) {
		String s = "hello";
		ClassUtil.printClassMethodMessage(s);

	    Integer n1 = 1;
	    ClassUtil.printClassMethodMessage(n1);


		Method m = null;
		try {
			m = ClassDemo3.class.getMethod("test01", Map.class,List.class);
			Type[] t = m.getGenericParameterTypes();
			for (Type paramType : t) {
				System.out.println("#"+paramType);
				if(paramType instanceof ParameterizedType){
					Type[] genericTypes = ((ParameterizedType) paramType).getActualTypeArguments();
					for (Type genericType : genericTypes) {
						System.out.println("x" + genericType);
					}
				}
			}
		} catch (NoSuchMethodException e) {
			e.printStackTrace();
		}

	}

}
