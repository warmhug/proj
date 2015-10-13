package ee.com.imooc.listener;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

import javax.servlet.ServletRequestEvent;
import javax.servlet.ServletRequestListener;
import javax.servlet.annotation.WebListener;
import javax.servlet.http.HttpServletRequest;

import ee.com.imooc.entity.User;
import ee.com.imooc.util.SessionUtil;

@WebListener
public class MyServletRequestListener implements ServletRequestListener {

	private ArrayList<User> userList;//在线用户List

	@Override
	public void requestDestroyed(ServletRequestEvent arg0) {

	}

	@Override
	public void requestInitialized(ServletRequestEvent arg0) {

		userList  = (ArrayList<User>)arg0.getServletContext().getAttribute("userList");

		if(userList==null)
			userList = new ArrayList<User>();

		HttpServletRequest request = (HttpServletRequest) arg0.getServletRequest();
		String sessionIdString = request.getSession().getId();

		if(SessionUtil.getUserBySessionId(userList,sessionIdString)==null){
			User user = new User();
			user.setSessionIdString(sessionIdString);
			user.setFirstTimeString(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()));
			user.setIpString(request.getRemoteAddr());
			userList.add(user);
		}
		arg0.getServletContext().setAttribute("userList", userList);
	}



}
