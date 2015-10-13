package ee.com.bjsxt.server;

import com.bjsxt.server.demo2.LoginServlet;
import com.bjsxt.server.demo2.RegisterServlet;
import com.bjsxt.server.demo2.Servlet;

import java.util.Map;

public class WebApp0 {
	private static com.bjsxt.server.demo2.ServletContext contxt;
	static{
		contxt =new com.bjsxt.server.demo2.ServletContext();

		Map<String,String> mapping =contxt.getMapping();
		mapping.put("/login", "login");
		mapping.put("/log", "login");
		mapping.put("/reg", "register");

		Map<String, com.bjsxt.server.demo2.Servlet> servlet =contxt.getServlet();
		servlet.put("login", new LoginServlet());
		servlet.put("register", new RegisterServlet());
	}

	public static Servlet getServlet(String url){
		if((null==url)||(url=url.trim()).equals("")){
			return null;
		}

		return contxt.getServlet().get(contxt.getMapping().get(url));

	}
}
