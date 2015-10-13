package ee.com.bjsxt1.server;

import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;
import java.util.StringTokenizer;

/**
 * 浏览器请求服务器
 * @author Administrator
 *
 */
public class Request {

	/*
	 * 服务器端口号
	 */
	private  int port;
	/*
	 * 请求服务器的地址
	 */
	private String host;
	/**
	 * 请求的url相对路径
	 */
	private String urlPattern;
	/**
	 * 请求中的数据
	 */
	private Map map=new HashMap();
	/**
	 * 请求的方式
	 */
	private String method;
	/**
	 * 请求头信息
	 */
	private String headInfo;
	private InputStream inStream;
	protected Request(InputStream inStream,int port){
		this.inStream=inStream;
		this.port=port;
		//解析请求头信息
		parseRequestHead();
	}
	
	private void parseRequestHead(){
		byte[] buf =new byte[1024];
		try {
			inStream.read(buf);
			headInfo =new String(buf);
			System.out.println(headInfo);
			method =headInfo.substring(0, headInfo.indexOf("/")).trim();
			System.out.println("请求方式："+method);
			host=headInfo.substring(headInfo.indexOf("Host:")+5, headInfo.indexOf(":"+port)).trim();
			System.out.println("请求地址："+host);
			if(method.equalsIgnoreCase("get")){
				parseGetString();
			}
			else if( method.equalsIgnoreCase("post")){
				parsePostString();
			}
			
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * post请求解析方法
	 * @param headInfo2
	 */
	private void parsePostString() {
		urlPattern=headInfo.substring(5, headInfo.indexOf("HTTP/")).trim();
		String dataString=headInfo.substring(headInfo.lastIndexOf("\r\n")).trim();
		StringTokenizer st =new StringTokenizer(dataString,"&");
		while(st.hasMoreTokens()){
			String[] ss= st.nextToken().split("=");
			map.put(ss[0], ss[1]);
		}
	}

	/**
	 * get请求解析方法
	 * @param headInfo2
	 */
	private void parseGetString() {
		String url=headInfo.substring(4, headInfo.indexOf("HTTP/"));
		if(url.indexOf("?")==-1){
			urlPattern=url.trim();
		}
		else{
			urlPattern=url.substring(0, url.indexOf("?")).trim();
			String dataString=url.substring(url.indexOf("?")+1).trim();
			StringTokenizer st =new StringTokenizer(dataString,"&");
			while(st.hasMoreTokens()){
				String[] ss= st.nextToken().split("=");
				map.put(ss[0], ss[1]);
			}
		}
	}

	public int getPort() {
		return port;
	}

	public void setPort(int port) {
		this.port = port;
	}

	public String getHost() {
		return host;
	}

	public void setHost(String host) {
		this.host = host;
	}

	public String getUrlPattern() {
		return urlPattern;
	}

	public void setUrlPattern(String urlPattern) {
		this.urlPattern = urlPattern;
	}

	public String getMethod() {
		return method;
	}

	public void setMethod(String method) {
		this.method = method;
	}

	public String getHeadInfo() {
		return headInfo;
	}

	public void setHeadInfo(String headInfo) {
		this.headInfo = headInfo;
	}
	/**
	 * 根据名字获得参数
	 * @param name
	 * @return
	 */
	public String getParameter(String name){
		if(map!=null&&map.size()>0){
			return (String) map.get(name);
		}
		return null;
	}
}
