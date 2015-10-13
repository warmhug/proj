package ee.com.bjsxt1.servlet;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.jdom.Document;
import org.jdom.Element;
import org.jdom.JDOMException;
import org.jdom.input.SAXBuilder;
import org.jdom.xpath.XPath;

/**
 * 解析web.xml配置文件
 * @author Administrator
 *
 */
public class WebApp {
	//跟目录
	private static String WEB_ROOT="D:\\share\\JavaProjects\\servletWorkspace\\lss03\\WebRoot\\";
	private ServletContext servletContext;
	//key 表示urlPattern ，value表示ServletMapping
	private Map<String,ServletMapping> servletMappings =new HashMap<String, ServletMapping>();
	
	
	private WebApp(){
		parseWebXml();
	}
	private static WebApp webApp;
	
	public static WebApp getWebApp(){
		if(webApp==null){
			webApp =new WebApp();
		}
		return webApp;
	}
	
	private void parseWebXml(){
		SAXBuilder builder =new SAXBuilder();
		try {
			Document doc= builder.build(new File(WEB_ROOT+"WEB-INF/web.xml"));
			XPath xpath=XPath.newInstance("//servlet");
			servletContext =new ServletContext();
			List list =xpath.selectNodes(doc.getRootElement());
			for (Iterator i = list.iterator(); i.hasNext();) {
				Element e = (Element) i.next();
				String servletName=e.getChildText("servlet-name");
				String servletClass =e.getChildText("servlet-class");
				Servlet servlet = (Servlet) Class.forName(servletClass).newInstance();
				servletContext.getContext().put(servletName, servlet);
			}
			xpath=XPath.newInstance("//servlet-mapping");
			List mappings =xpath.selectNodes(doc.getRootElement());
			for (Iterator i = mappings.iterator(); i.hasNext();) {
				Element e = (Element) i.next();
				String servletName=e.getChildText("servlet-name");
				String urlPattern =e.getChildText("url-pattern");
				ServletMapping mapping =new ServletMapping(servletName,urlPattern);
				servletMappings.put(urlPattern, mapping);
	
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}


	public ServletContext getServletContext() {
		return servletContext;
	}


	public void setServletContext(ServletContext servletContext) {
		this.servletContext = servletContext;
	}


	public Map<String, ServletMapping> getServletMappings() {
		return servletMappings;
	}


	public void setServletMappings(Map<String, ServletMapping> servletMappings) {
		this.servletMappings = servletMappings;
	}


}
