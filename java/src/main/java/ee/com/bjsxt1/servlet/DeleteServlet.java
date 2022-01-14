package ee.com.bjsxt1.servlet;

import ee.com.bjsxt1.server.Request;
import ee.com.bjsxt1.server.Response;
/**
 * 处理删除人员请求
 * @author Administrator
 *
 */
public class DeleteServlet extends Servlet{

	public void service(Request request,Response response){
		System.out.println("进入删除");
		response.print("删除成功");
	}
}
