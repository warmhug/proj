package data.orm.po;

import java.sql.*;
import java.util.*;

public class Emp {

	private Integer id;
	private java.sql.Date birthday;
	private Integer age;
	private String empname;
	private Double bonus;
	private Double salary;
	private Integer deptId;


	public Integer getId(){
		return id;
	}
	public java.sql.Date getBirthday(){
		return birthday;
	}
	public Integer getAge(){
		return age;
	}
	public String getEmpname(){
		return empname;
	}
	public Double getBonus(){
		return bonus;
	}
	public Double getSalary(){
		return salary;
	}
	public Integer getDeptId(){
		return deptId;
	}
	public void setId(Integer id){
		this.id=id;
	}
	public void setBirthday(java.sql.Date birthday){
		this.birthday=birthday;
	}
	public void setAge(Integer age){
		this.age=age;
	}
	public void setEmpname(String empname){
		this.empname=empname;
	}
	public void setBonus(Double bonus){
		this.bonus=bonus;
	}
	public void setSalary(Double salary){
		this.salary=salary;
	}
	public void setDeptId(Integer deptId){
		this.deptId=deptId;
	}
}
