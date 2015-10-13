package ee.velocity;

import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import org.apache.velocity.app.Velocity;
import org.apache.velocity.app.VelocityEngine;
import org.apache.velocity.VelocityContext;
import org.apache.velocity.runtime.RuntimeConstants;
import org.apache.velocity.runtime.resource.loader.ClasspathResourceLoader;

import java.util.ArrayList;
import java.util.Date;
import java.util.Properties;

public class Hello extends HttpServlet {
    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response)
            throws IOException, ServletException {

        request.setCharacterEncoding("UTF-8");
        response.setContentType("text/html;charset=UTF-8");

        // 创建Properties文件,也可以直接在目录下创建
        Properties properties = new Properties();
        properties.setProperty("resource.loader", "class");
        properties.setProperty("class.resource.loader.class", ClasspathResourceLoader.class.getName());
        properties.setProperty(Velocity.ENCODING_DEFAULT, "UTF-8");
        properties.setProperty(Velocity.INPUT_ENCODING, "UTF-8");
        properties.setProperty(Velocity.OUTPUT_ENCODING, "UTF-8");

        // Simple Velocity Runtime engine initialization methods.也就是使用的是一个单独的引擎，不能实例化。
        // Velocity.init(properties);

        // 创建模板引擎
        // 可以创建多个实例化的引擎，也就是说，一个类里面可以创建多个模板
        // 一般网站项目都不会只用到一个项目，所以一般我们还是用velocityEngine的好
        VelocityEngine velocityEngine = null;
        try {
            velocityEngine = new VelocityEngine(properties);
        } catch (Exception e) {
            e.printStackTrace();
        }

        // 创建上下文, 用于存放变量
        VelocityContext context = new VelocityContext();
        context.put("name", "test");
        context.put("date", (new Date()).toString());
        // List(String)
        ArrayList<String> arrList = new ArrayList<>();
        arrList.add("test01");
        arrList.add("test02");
        arrList.add("test03");
        context.put("arrList", arrList);

        // 读取模板文件流
        StringWriter sw = new StringWriter();

        // Velocity.mergeTemplate("ee/velocity/hello.vm", "utf-8", context, sw);
        velocityEngine.mergeTemplate("ee/velocity/hello.vm", "utf-8", context, sw);

        // 输出到页面
        response.getWriter().println(sw.toString());

        String s = "We are using $project $name to render this.";
        sw = new StringWriter();
        Velocity.evaluate( context, sw, "mystring", s );
        System.out.println("string : " + sw );

    }
}
