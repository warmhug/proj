package se.regexp;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * 测试正则表达式对象中分组的处理
 * @author Administrator
 *
 */
public class Demo02 {
	public static void main(String[] args) {
		//在这个字符串：asfsdf23323，是否符合指定的正则表达式：\w+
		//表达式对象
		Pattern p = Pattern.compile("([a-z]+)([0-9]+)");
		//创建Matcher对象
		Matcher m = p.matcher("aa232**ssd445*sds223");
	
		while(m.find()){
			System.out.println(m.group());	//group(),group(0)匹配整个表达式的子字符串
			System.out.println(m.group(1));
			System.out.println(m.group(2));
		}
		
	}
}
