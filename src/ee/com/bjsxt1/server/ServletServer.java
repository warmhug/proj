package ee.com.bjsxt1.server;

import java.io.IOException;
import java.io.InputStream;
import java.net.ServerSocket;
import java.net.Socket;

public class ServletServer {
	
	private ServerSocket serverSocket;
	private int port;
	private boolean shutDown;

	public ServletServer(int port){
		this.port =port;
	}
	
	public void startServer(){
		try {
			//监听端口启动服务
			serverSocket = new ServerSocket(port);
		} catch (IOException e) {
			System.out.println("监听 "+port+" 失败");
			System.exit(0);
		}
		while(!shutDown){
			//等待客户端连接
			try {
				Socket socket = serverSocket.accept();
				DispatchSocket dispatchSocket =new DispatchSocket(socket);
				new Thread(dispatchSocket).start();
			} catch (IOException e) {
				System.out.println("客户端出问题了");
				e.printStackTrace();
			}
			//创建一个线程处理客户端连接进来的请求
		}
	}
	
	public static void main(String[] args) {
		ServletServer server =new ServletServer(8080);
		server.startServer();
		
	}

	public boolean isShutDown() {
		return shutDown;
	}

	public void setShutDown(boolean shutDown) {
		this.shutDown = shutDown;
	}
}
