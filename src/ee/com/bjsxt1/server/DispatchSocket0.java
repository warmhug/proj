package ee.com.bjsxt1.server;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.Socket;
import java.text.SimpleDateFormat;
import java.util.Date;

public class DispatchSocket0 implements Runnable {

	private static SimpleDateFormat SDF=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	private Socket socket;
	public DispatchSocket0(Socket socket){
		this.socket =socket;
	}
	
	public void run() {
		InputStream inStream=null;
		OutputStream outStream=null;
		try{
			System.out.println("客户端是："+socket.getRemoteSocketAddress());
			//获取客户端发送给服务器的数据的输入流
			inStream =socket.getInputStream();
			outStream =socket.getOutputStream();
			byte[] buf =new byte[1024];
			inStream.read(buf);
			System.out.println(new String(buf));
			
			//往客户端发送一个html
			String html="<html ><head><meta http-equiv=\"Content-Type\" content=\"text/html; charset=gbk\" />" +
					"</head>" +
					"<body>" +
					"<h2>通信服务测试信息</h2>" +
					"<h2>服务器当前时间是："+SDF.format(new Date())+"</h2>" +
					"</body></html>";
			outStream.write(html.getBytes());
		}catch (Exception e) {
			e.printStackTrace();
		}finally{
			closeSocket(socket,outStream);
		}
	}

	public void closeSocket(Socket socket,OutputStream outStream){
		if(socket!=null)
			try {
				outStream.flush();
				outStream.close();
				socket.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
	}
}
