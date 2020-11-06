CREATE DATABASE chat;

USE chat;
AUTO_INCREMENT = 100;

CREATE TABLE users (
  user_id integer NOT NULL AUTO_INCREMENT,
  username text,
  PRIMARY KEY (user_id)
);

CREATE TABLE messages (
  message_id integer NOT NULL PRIMARY KEY AUTO_INCREMENT,
  message_text text,
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE rooms (
  room_id integer NOT NULL PRIMARY KEY AUTO_INCREMENT,
  room_name text,
  FOREIGN KEY (message_id) REFERENCES messages(message_id),
  FOREIGN KEY (user_id) REFERENCES users (user_id)
);

/* Create other tables and define schemas for them here! */




/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

