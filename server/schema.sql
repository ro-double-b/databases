DROP DATABASE IF EXISTS chat;

CREATE DATABASE chat;

USE chat;

-- new_table(column1 INT NOT NULL AUTO_INCREMENT, column2 VARCHAR(10), column3 VARCHAR(10), primary key (column1));
CREATE TABLE rooms (
  room_id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(128),
  PRIMARY KEY (room_id)     
);

CREATE TABLE messages (
--   /* Describe your table here.*/     
  message_id INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(128) NOT NULL,
  msg VARCHAR(256),
  room_id INT,
  PRIMARY KEY (message_id),
  FOREIGN KEY (room_id) REFERENCES rooms (room_id)
);

-- /* Create other tables and define schemas for them here! */



/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

