package data.orm.testorm;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/***
 * 使用Map来封装一条记录
 * 使用List<Map>,Map<Map>存储多条记录
 * @author Administrator
 *
 */
public class Demo02 {

	public static void test01(){
		Connection conn = JDBCUtil.getMysqlConn();
		PreparedStatement ps = null;
		ResultSet rs = null;
		Map<String,Object> row = new HashMap<String, Object>(); //使用一个Map封装一条记录
		try {
			ps = conn.prepareStatement("select empname,salary,age from emp where id=?");
			ps.setObject(1, 1);
			rs = ps.executeQuery();
			while(rs.next()){
//				System.out.println(rs.getString(1)+"--"+rs.getDouble(2)+"--"+rs.getInt(3));
				row.put("empname", rs.getObject(1));
				row.put("salary", rs.getObject(2));
				row.put("age", rs.getObject(3));
			}

		} catch (SQLException e) {
			e.printStackTrace();
		}finally{
			JDBCUtil.close(rs, ps, conn);
		}

		//遍历Map，就是遍历这一行的多列的信息
		for(String key:row.keySet()){
			System.out.print(key+"--"+row.get(key)+"\t");
		}
	}

	public static void test02(){
		Connection conn = JDBCUtil.getMysqlConn();
		PreparedStatement ps = null;
		ResultSet rs = null;
		List<Map<String,Object>> list= new ArrayList<Map<String,Object>>();
		try {
			ps = conn.prepareStatement("select empname,salary,age from emp where id>?");
			ps.setObject(1, 1);
			rs = ps.executeQuery();
			while(rs.next()){
//				System.out.println(rs.getString(1)+"--"+rs.getDouble(2)+"--"+rs.getInt(3));
				Map<String,Object> row = new HashMap<String, Object>(); //使用一个Map封装一条记录
				row.put("empname", rs.getObject(1));
				row.put("salary", rs.getObject(2));
				row.put("age", rs.getObject(3));
				list.add(row);
			}

		} catch (SQLException e) {
			e.printStackTrace();
		}finally{
			JDBCUtil.close(rs, ps, conn);
		}

		//遍历Map，就是遍历这一行的多列的信息
		for(Map<String,Object> row:list){
			for(String key:row.keySet()){
				System.out.print(key+"--"+row.get(key)+"\t");
			}
			System.out.println();
		}
	}

	public static void test03(){
		Connection conn = JDBCUtil.getMysqlConn();
		PreparedStatement ps = null;
		ResultSet rs = null;
		Map<String,Map<String,Object>> maps = new HashMap<String,Map<String,Object>>();
		try {
			ps = conn.prepareStatement("select empname,salary,age from emp where id>?");
			ps.setObject(1, 1);
			rs = ps.executeQuery();
			while(rs.next()){
//				System.out.println(rs.getString(1)+"--"+rs.getDouble(2)+"--"+rs.getInt(3));
				Map<String,Object> row = new HashMap<String, Object>(); //使用一个Map封装一条记录
				row.put("empname", rs.getObject(1));
				row.put("salary", rs.getObject(2));
				row.put("age", rs.getObject(3));
				maps.put(rs.getString(1), row);
			}

		} catch (SQLException e) {
			e.printStackTrace();
		}finally{
			JDBCUtil.close(rs, ps, conn);
		}

		//遍历Map，就是遍历这一行的多列的信息
		for(String empname:maps.keySet()){
			Map<String,Object> row = maps.get(empname);
			for(String key:row.keySet()){
				System.out.print(key+"--"+row.get(key)+"\t");
			}
			System.out.println();
		}
	}


	public static void main(String[] args) {

		test03();

	}
}
