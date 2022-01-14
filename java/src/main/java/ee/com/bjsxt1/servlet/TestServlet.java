package ee.com.bjsxt1.servlet;

import java.text.SimpleDateFormat;
import java.util.Date;

import ee.com.bjsxt1.server.Request;
import ee.com.bjsxt1.server.Response;
import ee.com.bjsxt1.server.Response;

public class TestServlet extends Servlet{
	private static SimpleDateFormat SDF=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	/**
	 * 处理请求
	 * @param request
	 * @param response
	 */
	public void service(Request request,Response response){
		//往客户端发送一个html
		String html="<html ><head><meta http-equiv=\"Content-Type\" content=\"text/html; charset=gbk\" />" +
		"</head>" +
		"<body>" +
		"<h2>通信服务测试信息</h2>" +
		"<h2>服务器当前时间是："+SDF.format(new Date())+"</h2>" +
		"</body></html>";
		response.print(html);
	}
}
