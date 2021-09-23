create database [news_system]

create table [User]
(
  Id int primary key identity(1,1),
  Uname varchar(50) null,
  Upwd varchar(50) null,
  Utype int null,
  Reg_time datetime null
)

create table [News]
(
  Id bigint primary key identity(1,1),
  N_title varchar(50) null,
  N_author varchar(20) null,
  N_source varchar(50) null,
  N_content text null,
  N_click int null,
  Addtime datetime null,
  N_type_id int not null,
  N_remark_id bigint not null
)

create table [News_type]
(
  Id int primary key identity(1,1),
  Type_name varchar(20) null
)

create table [remark]
(
  Id bigint primary key identity(1,1),
  R_content varchar(500) null,
  Addtime datetime null,
  R_user_id int null,
  R_news_id int null
)

create table [Vote]
(
  Id int primary key identity(1,1),
  V_item varchar(500) null,
  V_group_id int null,
  V_user_id int not null,
  V_addtime datetime null,
  V_count bigint null
)

create table [Vote_group]
(
   Id int primary key identity(1,1),
   group_name varchar(50) null,
   group_type int null,
   addtime datetime null
)