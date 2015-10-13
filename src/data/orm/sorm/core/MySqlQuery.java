package data.orm.sorm.core;

import java.lang.reflect.Field;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.util.ArrayList;
import java.util.List;

import data.orm.po.Emp;
import data.orm.sorm.bean.ColumnInfo;
import data.orm.sorm.bean.TableInfo;
import data.orm.sorm.utils.JDBCUtils;
import data.orm.sorm.utils.ReflectUtils;
import data.orm.vo.EmpVO;

/**
 * 负责针对Mysql数据库的查询
 * @author gaoqi
 *
 */
public class MySqlQuery implements Query {

	public static void testDML(){
		Emp e = new Emp();
		e.setEmpname("lily");
		e.setBirthday(new java.sql.Date(System.currentTimeMillis()));
		e.setAge(30);
		e.setSalary(3000.8);
		e.setId(1);
//		new MySqlQuery().delete(e);
//		new MySqlQuery().insert(e);
		new MySqlQuery().update(e,new String[]{"empname","age","salary"});
	}

	public static void testQueryRows(){
		List<Emp> list = new MySqlQuery().queryRows("select id,empname,age from emp where age>? and salary<?",
				Emp.class, new Object[]{10,5000});

		for(Emp e:list){
			System.out.println(e.getEmpname());
		}

		String sql2 = "select e.id,e.empname,salary+bonus 'xinshui',age,d.dname 'deptName',d.address 'deptAddr' from emp e "
+"join dept d on e.deptId=d.id ";
		List<EmpVO> list2 = new MySqlQuery().queryRows(sql2,
				EmpVO.class, null);

		for(EmpVO e:list2){
			System.out.println(e.getEmpname()+"-"+e.getDeptAddr()+"-"+e.getXinshui());
		}

	}


	public static void main(String[] args) {
//		Number obj = (Number)new MySqlQuery().queryValue("select count(*) from emp where salary>?",new Object[]{1000});
		Number obj = new MySqlQuery().queryNumber("select count(*) from emp where salary>?",new Object[]{1000});
		System.out.println(obj.doubleValue());
	}

	@Override
	public void delete(Class clazz, Object id) {
		//Emp.class,2-->delete from emp where id=2
		//通过Class对象找TableInfo
		TableInfo tableInfo = TableContext.poClassTableMap.get(clazz);
		//获得主键
		ColumnInfo onlyPriKey = tableInfo.getOnlyPriKey();

		String sql = "delete from "+tableInfo.getTname()+" where "+onlyPriKey.getName()+"=? ";

		executeDML(sql, new Object[]{id});
	}

	@Override
	public void delete(Object obj) {
		Class c = obj.getClass();
		TableInfo tableInfo = TableContext.poClassTableMap.get(c);
		ColumnInfo onlyPriKey = tableInfo.getOnlyPriKey();  //主键

		//通过反射机制，调用属性对应的get方法或set方法
		Object priKeyValue = ReflectUtils.invokeGet(onlyPriKey.getName(), obj);

		delete(c, priKeyValue);
	}

	@Override
	public int executeDML(String sql, Object[] params) {
		Connection conn = DBManager.getConn();
		int count = 0;
		PreparedStatement ps = null;
		try {
			ps = conn.prepareStatement(sql);

			//给sql设参
			JDBCUtils.handleParams(ps, params);
			System.out.println(ps);
			count  = ps.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		}finally{
			DBManager.close(ps, conn);
		}

		return count;
	}

	@Override
	public void insert(Object obj) {
		//obj-->表中。             insert into 表名  (id,uname,pwd) values (?,?,?)
		Class c = obj.getClass();
		List<Object> params = new ArrayList<Object>();   //存储sql的参数对象
		TableInfo tableInfo = TableContext.poClassTableMap.get(c);
		StringBuilder sql  = new StringBuilder("insert into "+tableInfo.getTname()+" (");
		int countNotNullField = 0;   //计算不为null的属性值
		Field[] fs = c.getDeclaredFields();
		for(Field f:fs){
			String fieldName = f.getName();
			Object fieldValue = ReflectUtils.invokeGet(fieldName, obj);

			if(fieldValue!=null){
				countNotNullField++;
				sql.append(fieldName+",");
				params.add(fieldValue);
			}
		}

		sql.setCharAt(sql.length()-1, ')');
		sql.append(" values (");
		for(int i=0;i<countNotNullField;i++){
			sql.append("?,");
		}
		sql.setCharAt(sql.length()-1, ')');

		executeDML(sql.toString(), params.toArray());
	}

	@Override
	public Number queryNumber(String sql, Object[] params) {
		return (Number)queryValue(sql, params);
	}

	@Override
	public List queryRows(String sql, Class clazz, Object[] params) {

		Connection conn = DBManager.getConn();
		List list = null;    //存储查询结果的容器
		PreparedStatement ps = null;
		ResultSet rs = null;
		try {
			ps = conn.prepareStatement(sql);
			//给sql设参
			JDBCUtils.handleParams(ps, params);
			System.out.println(ps);
			rs = ps.executeQuery();

			ResultSetMetaData metaData = rs.getMetaData();
			//多行
			while(rs.next()){
				if(list==null){
					list = new ArrayList();
				}
				Object rowObj = clazz.newInstance();   //调用javabean的无参构造器

				//多列       select username ,pwd,age from user where id>? and age>18
				for(int i=0;i<metaData.getColumnCount();i++){
					String columnName = metaData.getColumnLabel(i+1);  //username
					Object columnValue = rs.getObject(i+1);

					//调用rowObj对象的setUsername(String uname)方法，将columnValue的值设置进去
					ReflectUtils.invokeSet(rowObj, columnName, columnValue);
				}

				list.add(rowObj);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}finally{
			DBManager.close(ps, conn);
		}

		return list;
	}

	@Override
	public Object queryUniqueRow(String sql, Class clazz, Object[] params) {
		List list = queryRows(sql, clazz, params);
		return (list==null&&list.size()>0)?null:list.get(0);
	}

	@Override
	public Object queryValue(String sql, Object[] params) {
		Connection conn = DBManager.getConn();
		Object value = null;    //存储查询结果的对象
		PreparedStatement ps = null;
		ResultSet rs = null;
		try {
			ps = conn.prepareStatement(sql);
			//给sql设参
			JDBCUtils.handleParams(ps, params);
			System.out.println(ps);
			rs = ps.executeQuery();
			while(rs.next()){
				value = rs.getObject(1);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}finally{
			DBManager.close(ps, conn);
		}

		return value;

	}

	@Override
	public int update(Object obj, String[] fieldNames) {
		//obj{"uanme","pwd"}-->update 表名  set uname=?,pwd=? where id=?
		Class c = obj.getClass();
		List<Object> params = new ArrayList<Object>();   //存储sql的参数对象
		TableInfo tableInfo = TableContext.poClassTableMap.get(c);
		ColumnInfo  priKey = tableInfo.getOnlyPriKey();   //获得唯一的主键
		StringBuilder sql  = new StringBuilder("update "+tableInfo.getTname()+" set ");

		for(String fname:fieldNames){
			Object fvalue = ReflectUtils.invokeGet(fname,obj);
			params.add(fvalue);
			sql.append(fname+"=?,");
		}
		sql.setCharAt(sql.length()-1, ' ');
		sql.append(" where ");
		sql.append(priKey.getName()+"=? ");

		params.add(ReflectUtils.invokeGet(priKey.getName(), obj));    //主键的值

		return executeDML(sql.toString(), params.toArray());
	}

}
