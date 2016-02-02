package data.other;


import data.other.annotation.Insert;
import data.other.annotation.Param;
import data.other.annotation.Query;
import data.other.annotation.Update;

public interface UserDao {
    @Update("delete from t_user where id=:id")
    void delete(@Param("id") long id);

    @Insert("insert t_user(id,name) values(:id,:name)")
    long add(@Param("id") long id, @Param("name") String name);

    @Update("update t_user set name=:name where id=:id")
    boolean modify(@Param("name") String name, @Param("id") long id);

    @Query("Select * from t_user where id=:id")
    User find(@Param("id") long id);
}
