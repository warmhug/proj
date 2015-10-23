package ee.com.bjsxt.server;

import ee.com.bjsxt.server.Servlet;

import java.util.Map;

public class WebApp01 {
	private static ee.com.bjsxt.server.ServletContext contxt;
	static{
		contxt =new ee.com.bjsxt.server.ServletContext();

		Map<String,String> mapping =contxt.getMapping();
		mapping.put("/login", "login");
		mapping.put("/log", "login");
		mapping.put("/reg", "register");

		Map<String,String> servlet =contxt.getServlet();
		servlet.put("login", "ee.com.bjsxt.server.LoginServlet");
		servlet.put("register", "ee.com.bjsxt.server.RegisterServlet");
	}

	public static ee.com.bjsxt.server.Servlet getServlet(String url) throws InstantiationException, IllegalAccessException, ClassNotFoundException{
		if((null==url)||(url=url.trim()).equals("")){
			return null;
		}

		//return contxt.getServlet().get(contxt.getMapping().get(url));
		String name=contxt.getServlet().get(contxt.getMapping().get(url));
		return (Servlet)Class.forName(name).newInstance();
	}
}
