drop table if exists users;


create table users(
user_id serial primary key
,first_name varchar(64)
,last_name varchar(64)
,status text
,profile_picture text
,department varchar(64)
,messages text []);