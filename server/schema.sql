CREATE DATABASE chat;

USE chat;

CREATE TABLE users (
  id integer NOT NULL PRIMARY KEY AUTO_INCREMENT,
  username text
);

CREATE TABLE messages (
  id integer NOT NULL PRIMARY KEY AUTO_INCREMENT,
  message_text text,
  roomname text,
  createdAt integer,
  updatedAt integer,
  user_id integer
  -- FOREIGN KEY (user_id) REFERENCES users (user_id)
);

-- CREATE TABLE rooms (
--   room_id integer NOT NULL PRIMARY KEY AUTO_INCREMENT,
--   room_name text
-- );

-- CREATE TABLE messages_rooms (
--   id integer NOT NULL PRIMARY KEY AUTO_INCREMENT,
--   message_id integer,
--   room_id integer
  -- FOREIGN KEY (message_id) REFERENCES messages(message_id),
  -- FOREIGN KEY (room_id) REFERENCES rooms(room_id)
-- );

/* Create other tables and define schemas for them here! */




/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

