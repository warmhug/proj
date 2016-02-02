package data.other;

import java.lang.reflect.Proxy;

/**
 * Created by hua on 15/10/13.
 */
public class Test {
    public static void main(String[] args) {
        //如果使用spring，可以实现spring工厂bean接口包装这段代码，为server类提供注入
        UserDao dao = (UserDao) Proxy.newProxyInstance(
                AopInvocationHandlerImpl.class.getClassLoader(),
                new Class[]{UserDao.class},
                new DaoInvocationHandlerImpl());
        Object object = dao.find(1L);
        System.out.println("xxx");
    }
}
