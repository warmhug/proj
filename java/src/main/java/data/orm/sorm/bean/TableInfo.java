package data.orm.sorm.bean;

import java.util.List;
import java.util.Map;


/**
 * 存储表结构的信息
 * @author gaoqi
 *
 */
public class TableInfo {
	/**
	 * 表名
	 */
	private String tname;

	/**
	 * 所有字段的信息
	 */
	private Map<String,ColumnInfo> columns;

	/**
	 * 唯一主键(目前我们只能处理表中有且只有一个主键的情况)
	 */
	private ColumnInfo  onlyPriKey;


	/**
	 * 如果联合主键，则在这里存储
	 */
	private List<ColumnInfo> priKeys;


	public List<ColumnInfo> getPriKeys() {
		return priKeys;
	}

	public void setPriKeys(List<ColumnInfo> priKeys) {
		this.priKeys = priKeys;
	}

	public String getTname() {
		return tname;
	}

	public void setTname(String tname) {
		this.tname = tname;
	}

	public Map<String, ColumnInfo> getColumns() {
		return columns;
	}

	public void setColumns(Map<String, ColumnInfo> columns) {
		this.columns = columns;
	}

	public ColumnInfo getOnlyPriKey() {
		return onlyPriKey;
	}

	public void setOnlyPriKey(ColumnInfo onlyPriKey) {
		this.onlyPriKey = onlyPriKey;
	}

	public TableInfo(String tname, Map<String, ColumnInfo> columns,
			ColumnInfo onlyPriKey) {
		super();
		this.tname = tname;
		this.columns = columns;
		this.onlyPriKey = onlyPriKey;
	}

	public TableInfo() {
	}

	public TableInfo(String tname,List<ColumnInfo> priKeys, Map<String, ColumnInfo> columns
			) {
		super();
		this.tname = tname;
		this.columns = columns;
		this.priKeys = priKeys;
	}


}
