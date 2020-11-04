CREATE DATABASE chat;

USE chat;


CREATE TABLE messages (
  message_id integer PRIMARY KEY,
  message_text text,
  user_id integer
  -- FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE users (
  user_id integer PRIMARY KEY,
  username text,
  message_id integer,
  FOREIGN KEY (message_id) REFERENCES messages(message_id)
);

CREATE TABLE rooms (
  room_id integer PRIMARY KEY,
  room_name text,
  user_id integer,
  message_id integer
  -- FOREIGN KEY (message_id) REFERENCES messages(message_id),
  -- FOREIGN KEY (user_id) REFERENCES users (user_id)
);

/* Create other tables and define schemas for them here! */




/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

