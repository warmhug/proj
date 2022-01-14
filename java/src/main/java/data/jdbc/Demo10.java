package data.jdbc;

import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.sql.Blob;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;



/**
 * 测试BLOB  二进制大对象的使用
 * @author 高淇 www.sxt.cn
 *
 */
public class Demo10 {


	public static void main(String[] args) {
		Connection conn = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		InputStream is  = null;
		OutputStream os = null;
		try {
			//加载驱动类
			Class.forName("com.mysql.jdbc.Driver");
			conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/testjdbc","root","");

//			ps = conn.prepareStatement("insert into t_user (username,headImg) values (?,?) ");
//			ps.setString(1, "高淇");
//			ps.setBlob(2, new FileInputStream("d:/icon.jpg"));
//			ps.execute();


			ps = conn.prepareStatement("select * from t_user where id=?");
			ps.setObject(1, 101026);

			rs = ps.executeQuery();
			while(rs.next()){
				Blob b = rs.getBlob("headImg");
				is  = b.getBinaryStream();
				os = new FileOutputStream("d:/a.jpg");
				int temp = 0;
				while((temp=is.read())!=-1){
					os.write(temp);
				}
			}

		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}finally{
			try {
				if(is!=null){
					is.close();
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
			try {
				if(os!=null){
					os.close();
				}
			} catch (Exception e) {
				e.printStackTrace();
			}

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
