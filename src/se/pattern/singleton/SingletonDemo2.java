package se.pattern.singleton;

/**
 * 测试懒汉式单例模式
 * @author 尚学堂高淇 www.sxt.cn
 *
 */
public class SingletonDemo2 {

	//类初始化时，不初始化这个对象（延时加载，真正用的时候再创建）。
	private static SingletonDemo2 instance;

	private SingletonDemo2(){ //私有化构造器
	}

	//方法同步，调用效率低！
	public static  synchronized SingletonDemo2  getInstance(){
		if(instance==null){
			instance = new SingletonDemo2();
		}
		return instance;
	}

}
