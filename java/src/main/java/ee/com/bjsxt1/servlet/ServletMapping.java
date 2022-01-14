package ee.com.bjsxt1.servlet;

public class ServletMapping {

	private String servletName;
	private String urlPattern;
	public String getServletName() {
		return servletName;
	}
	public void setServletName(String servletName) {
		this.servletName = servletName;
	}
	public String getUrlPattern() {
		return urlPattern;
	}
	public void setUrlPattern(String urlPattern) {
		this.urlPattern = urlPattern;
	}
	
	public ServletMapping(String str,String url){
		this.servletName=str;
		this.urlPattern=url;
	}
}
