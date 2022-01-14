package data.other;

import data.other.annotation.Insert;
import data.other.annotation.Param;
import data.other.annotation.Query;
import data.other.annotation.Update;

import java.lang.annotation.Annotation;
import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author Silence
 */
public class DaoInvocationHandlerImpl  implements InvocationHandler {

    private static Connection conn = null;

    static{
        try {
            conn = DriverManager.getConnection("jdbc:mysql://localhost/test?useUnicode=true&characterEncoding=UTF-8&autoReconnect=true", "root", "");
        } catch (SQLException ex) {
            Logger.getLogger(AopInvocationHandlerImpl.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {

        Logger.getLogger(AopInvocationHandlerImpl.class.getName()).log(Level.SEVERE, "{0} invoke", method.getName());

        Annotation[][] annos = method.getParameterAnnotations();
        try {
            if (method.getAnnotation(Query.class) != null) {
                Query query = method.getAnnotation(Query.class);
                NamedParameterStatement nps = new NamedParameterStatement(conn, query.value());
                for(int i=0; i < annos.length;i++){
                    for(Annotation an:annos[i]){
                        if(an instanceof Param){
                            nps.setObject(((Param)an).value(), args[i]);
                        }
                    }
                }
                //这里也可以再次包装
                return nps.executeQuery();
            } else if (method.getAnnotation(Insert.class) != null) {
                //代码省略
                return null;
            } else if (method.getAnnotation(Update.class) != null){
                //代码省略
                return null;
            } else {
                //代码省略
                return null;
            }
        } catch (Exception e) {
            Logger.getLogger(AopInvocationHandlerImpl.class.getName()).log(Level.SEVERE, "error occurs in [" + method.toGenericString() + "]", e);
            throw e;
        }
    }

}
