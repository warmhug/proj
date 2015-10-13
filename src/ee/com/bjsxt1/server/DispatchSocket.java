package ee.com.bjsxt1.server;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.Socket;
import java.text.SimpleDateFormat;
import java.util.Date;

import ee.com.bjsxt1.servlet.Servlet;
import ee.com.bjsxt1.servlet.ServletMapping;
import ee.com.bjsxt1.servlet.TestServlet;
import ee.com.bjsxt1.servlet.WebApp;
import ee.com.bjsxt1.servlet.Servlet;

public class DispatchSocket implements Runnable {

	
	private Socket socket;
	public DispatchSocket(Socket socket){
		this.socket =socket;
	}
	
	public void run() {
		try{
			System.out.println("客户端是："+socket.getRemoteSocketAddress());
			//获取客户端发送给服务器的数据的输入流
			Request request =new Request(socket.getInputStream(),8080);
			Response response =new Response(socket.getOutputStream());
//			Servlet servlet =new TestServlet();
//			servlet.service(request, response);
			WebApp webApp =WebApp.getWebApp();
			String urlPattern =request.getUrlPattern();
			ServletMapping mapping= webApp.getServletMappings().get(urlPattern);
			if(mapping!=null){
				String servletName =mapping.getServletName();
				Servlet servlet = webApp.getServletContext().getServlet(servletName);
				if(servlet!=null){
					servlet.service(request, response);
				}else{
					response.println("没有获得Servlet");
				}
			}else{
				response.print("你请求的url错误，该url不正确。没有找到相应的页面！");
			}
			
		}catch (Exception e) {
			e.printStackTrace();
		}finally{
			closeSocket(socket);
		}
	}

	public void closeSocket(Socket socket){
		if(socket!=null)
			try {
				socket.getOutputStream().flush();
				socket.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
	}
}
