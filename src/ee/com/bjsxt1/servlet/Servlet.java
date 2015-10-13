package ee.com.bjsxt1.servlet;

import ee.com.bjsxt1.server.Request;
import ee.com.bjsxt1.server.Response;
import ee.com.bjsxt1.server.Response;

public abstract class Servlet {
	
	
	/**
	 * 处理请求
	 * @param request
	 * @param response
	 */
	public abstract void service(Request request,Response response);
}
