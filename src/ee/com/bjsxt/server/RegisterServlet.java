package ee.com.bjsxt.server;

public class RegisterServlet extends Servlet{

	@Override
	public void doGet(Request req,Response rep) throws Exception {
		
	}
	
	
	@Override
	public void doPost(Request req,Response rep) throws Exception {
		rep.println("<html><head><title>返回注册</title>");
		rep.println("</head><body>");
		rep.println("你的用户名为:"+req.getParameter("uname"));
		rep.println("</body></html>");
	}

}
