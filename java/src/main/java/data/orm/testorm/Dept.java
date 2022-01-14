package data.orm.testorm;

public class Dept {
	private Integer id;
	private String dname;
	private String address;


	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getDname() {
		return dname;
	}
	public void setDname(String dname) {
		this.dname = dname;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public Dept(Integer id, String dname, String address) {
		super();
		this.id = id;
		this.dname = dname;
		this.address = address;
	}
	public Dept(String dname, String address) {
		super();
		this.dname = dname;
		this.address = address;
	}

	public Dept() {
	}

}
