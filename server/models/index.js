var db = require('../db');

module.exports = {
  messages: {

    // A function which produces all the messages
    get: function () {
      let query = 'SELECT message_text FROM messages';
      db.con.query(query, (err, result) => {
        if (err) { throw err; }
        console.log('result: ', result);
      });
      return result;
    },

    // A function which writes a message to the db
    post: function (request) {
      let text = JSON.stringify(request.text);
      console.log(text);
      let query = `INSERT INTO messages (message_id, message_text) VALUES (4,'${text}')`;
      // work on the auto increment
      db.con.query(query, (err, result) => {
        if (err) {
          console.log('error on post', err);
          return;
        }
        console.log('result: ', result);
        return result;
      });
    }
  },


  users: {

    // A function which produces all the users?
    get: function (query) {
      query = `SELECT username FROM users WHERE username = ${query.name}`;
      db.con.query(query, (err, result) => {
        if (err) { throw err; }
        console.log('result: ', result);
        return result;
      });
    },

    // A function which writes a user to the db
    post: function (query) {
      query = `INSERT INTO users (user_id, username) VALUES(1, ${query.name});`;
      db.con.query(query, (err, result) => {
        if (err) { throw err; }
        console.log('result: ', result); return result;
      });
    }
  }
};

