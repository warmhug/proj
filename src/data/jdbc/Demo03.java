package data.jdbc;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Statement;

import javax.swing.text.html.HTMLDocument.HTMLReader.PreAction;


/**
 * 测试PreparedStatement的基本用法
 * @author 高淇 www.sxt.cn
 *
 */
public class Demo03 {
	public static void main(String[] args) {
		Connection conn = null;
		PreparedStatement ps = null;
		try {
			//加载驱动类
			Class.forName("com.mysql.jdbc.Driver");
			conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/testjdbc","root","");

			String sql = "insert into t_user (username,pwd,regTime) values (?,?,?)";  //?占位符
			ps = conn.prepareStatement(sql);
//			ps.setString(1, "高淇3");	//参数索引是从1开始计算， 而不是0
//			ps.setString(2, "123456");
//			ps.setDate(3, new java.sql.Date(System.currentTimeMillis()));

			//可以使用setObject方法处理参数
			ps.setObject(1, "高淇5");
			ps.setObject(2, "234567");
			ps.setObject(3, new java.sql.Date(System.currentTimeMillis()));


			System.out.println("插入一行记录");
//			ps.execute();
			int count = ps.executeUpdate();
			System.out.println(count);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}finally{
			try {
				if(ps!=null){
					ps.close();
				}
			} catch (SQLException e) {
				e.printStackTrace();
			}
			try {
				if(conn!=null){
					conn.close();
				}
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
	}
}
