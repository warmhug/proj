package ee.com.bjsxt1.servlet;

import java.util.HashMap;
import java.util.Map;

/**
 * 装载所有的Servlet
 * @author Administrator
 *
 */
public class ServletContext {

	//容器，装载项目中所有的Servlet，key为servlet-name,value为Servlet实例
	private Map<String, Servlet> context =new HashMap<String, Servlet>();

	public Map<String, Servlet> getContext() {
		return context;
	}

	public void setContext(Map<String, Servlet> context) {
		this.context = context;
	}
	
	//根据Servlet名字获得Servlet
	public Servlet getServlet(String servletName){
		if(context!=null){
			return context.get(servletName);
		}
		return null;
	}
	
}
