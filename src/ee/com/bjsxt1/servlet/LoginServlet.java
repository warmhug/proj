package ee.com.bjsxt1.servlet;

import ee.com.bjsxt1.server.Request;
import ee.com.bjsxt1.server.Response;
import ee.com.bjsxt1.server.Response;

/**
 * 处理登陆的请求
 * @author Administrator
 *
 */
public class LoginServlet extends Servlet{

	public void service(Request request,Response response){
		System.out.println("进入登陆");
		//
		String username =request.getParameter("username");
		String password =request.getParameter("password");
		
		String sql="select count(*) from t_user where username=? and password=?";
		
		
		response.print("登陆成功");
	}
}
