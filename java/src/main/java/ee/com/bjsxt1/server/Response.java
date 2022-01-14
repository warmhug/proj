package ee.com.bjsxt1.server;

import java.io.IOException;
import java.io.OutputStream;

/**
 * 服务器响应浏览器
 * @author Administrator
 *
 */
public class Response {
	
	private OutputStream outStream;
	protected Response(OutputStream outStream){
		this.outStream =outStream;
	}
	
	public void print(String info){
		try {
			outStream.write(info.getBytes());
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public void println(String info){
		try {
			outStream.write((info+"\r\n").getBytes());
		} catch (IOException e) {
			e.printStackTrace();
		}
		
	}
}
