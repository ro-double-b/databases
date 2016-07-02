DROP DATABASE IF EXISTS chat;

CREATE DATABASE chat;

USE chat;

-- new_table(column1 INT NOT NULL AUTO_INCREMENT, column2 VARCHAR(10), column3 VARCHAR(10), primary key (column1));
CREATE TABLE rooms (
  id INT NOT NULL AUTO_INCREMENT,
  roomname VARCHAR(128) UNIQUE,
  PRIMARY KEY (id)     
);

CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(128) UNIQUE,
  PRIMARY KEY (id)     
);

CREATE TABLE messages (
--   /* Describe your table here.*/     
  id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  text VARCHAR(256),
  room_id INT,
  PRIMARY KEY (id),
  FOREIGN KEY (room_id) REFERENCES rooms (id),
  FOREIGN KEY (user_id) REFERENCES users (id)
);

-- /* Create other tables and define schemas for them here! */



/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

