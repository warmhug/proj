package data.other;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;

public class AopInvocationHandlerImpl implements InvocationHandler {
    private Object bizPojo;

    public AopInvocationHandlerImpl(Object bizPojo) {
        this.bizPojo = bizPojo;
    }

    /*
     * (non - Javadoc)
     *
     * @see java.lang.reflect.InvocationHandler#invoke(java.lang.Object,
     *      java.lang.reflect.Method, java.lang.Object[])
     */
    public Object invoke(Object proxy, Method method, Object[] args)
            throws Throwable {
        Object o = null;
        try {
            System.out.println("Start:" + method.getName());
            o = method.invoke(bizPojo, args);
            System.out.println("End:" + method.getName());
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("Exception Occured!" + e.getMessage());
            // excetpion handling.
        }
        return o;
    }
}