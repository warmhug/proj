package ee.com.bjsxt.server;

import com.bjsxt.server.demo3.Servlet;

import java.util.Map;

public class WebApp01 {
	private static com.bjsxt.server.demo3.ServletContext contxt;
	static{
		contxt =new com.bjsxt.server.demo3.ServletContext();

		Map<String,String> mapping =contxt.getMapping();
		mapping.put("/login", "login");
		mapping.put("/log", "login");
		mapping.put("/reg", "register");

		Map<String,String> servlet =contxt.getServlet();
		servlet.put("login", "com.bjsxt.server.demo3.LoginServlet");
		servlet.put("register", "com.bjsxt.server.demo3.RegisterServlet");
	}

	public static com.bjsxt.server.demo3.Servlet getServlet(String url) throws InstantiationException, IllegalAccessException, ClassNotFoundException{
		if((null==url)||(url=url.trim()).equals("")){
			return null;
		}
		//����ַ�(����·��)��������

		//return contxt.getServlet().get(contxt.getMapping().get(url));
		String name=contxt.getServlet().get(contxt.getMapping().get(url));
		return (Servlet)Class.forName(name).newInstance();//ȷ���չ������
	}
}
