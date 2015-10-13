package se.regexp;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * 测试正则表达式对象的基本用法
 * @author Administrator
 *
 */
public class Demo01 {
	public static void main(String[] args) {
		//在这个字符串：asfsdf23323，是否符合指定的正则表达式：\w+
		//表达式对象
		Pattern p = Pattern.compile("\\w+");
		//创建Matcher对象
		Matcher m = p.matcher("asfsdf2&&3323");
//		boolean yesorno = m.matches();	//尝试将整个字符序列与该模式匹配
//		System.out.println(yesorno);
		
//		boolean yesorno2 = m.find();	//该方法扫描输入的序列，查找与该模式匹配的下一个子序列
//		System.out.println(yesorno2);
		
//		System.out.println(m.find());
//		System.out.println(m.group());
//		System.out.println(m.find());
//		System.out.println(m.group());
		
	
		while(m.find()){
			System.out.println(m.group());	//group(),group(0)匹配整个表达式的子字符串
			System.out.println(m.group(0));
		}
		
	}
}
