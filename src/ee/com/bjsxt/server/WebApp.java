package ee.com.bjsxt.server;

import java.util.List;
import java.util.Map;

import javax.xml.parsers.SAXParser;
import javax.xml.parsers.SAXParserFactory;

public class WebApp {
	private static ServletContext contxt;
	static{
		try {
			//获取解析工厂
			SAXParserFactory factory = SAXParserFactory.newInstance();
			//获取解析器
			SAXParser sax = factory.newSAXParser();
			//指定xml+处理器
			WebHandler web = new WebHandler();
			sax.parse(Thread.currentThread().getContextClassLoader()
					.getResourceAsStream("com/bjsxt/server/demo4/web.xml"), web);
			
			
			//将list 转成Map
			contxt =new ServletContext();			
			Map<String,String> servlet =contxt.getServlet();
			
			//servlet-name  servlet-class 
			for(Entity entity:web.getEntityList()){
				servlet.put(entity.getName(), entity.getClz());
				
			}
			
			//url-pattern servlet-name			
			Map<String,String> mapping =contxt.getMapping();
			for(Mapping mapp:web.getMappingList()){
				List<String> urls =mapp.getUrlPattern();
				for(String url:urls ){
					mapping.put(url, mapp.getName());
				}
			}
			
		} catch (Exception e) {
			
		}
		
		
	}
	
	public static Servlet getServlet(String url) throws InstantiationException, IllegalAccessException, ClassNotFoundException{
		if((null==url)||(url=url.trim()).equals("")){
			return null;
		}
		//根据字符串(完整路径)创建对象
		
		//return contxt.getServlet().get(contxt.getMapping().get(url));
		String name=contxt.getServlet().get(contxt.getMapping().get(url));
		return (Servlet)Class.forName(name).newInstance();//确保空构造存在
	}
}
