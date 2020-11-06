var db = require('../db');

module.exports = {
  messages: {

    // A function which produces all the messages
    get: function (callback) {
      let query = 'SELECT message_text FROM messages';
      db.con.query(query, (err, result) => {
        if (err) { callback(err); } else {
          callback(null, result);
        }
      });
    },

    // A function which writes a message to the db
    post: function (request, callback) {
      let text = JSON.stringify(request.text);
      let lastID = db.con.query('SELECT LAST_INSERT_ID() FROM messages', (err, result)=>{
        if (err) { throw err; } else { return (result); }
      });
      let query = `INSERT INTO messages (message_id, message_text) VALUES (LAST_INSERT_ID(),'${text}')`;
      // work on the auto increment
      db.con.query(query, (err, result) => {
        if (err) {
          callback(err);
        } else {
          callback(null, result);
        }
      });
    }
  },


  users: {

    // A function which produces all the users?
    get: function (callback) {
      db.con.query('SELECT * FROM users', (err, result) => {
        if (err) { callback(err); } else {
          callback(null, result);
        }
      });
    },

    // A function which writes a user to the db
    post: function (response, callback) {
      query = `INSERT INTO users (user_id, username) VALUES(LAST_INSERT_ID(), '${JSON.stringify(response.username)}');`;
      db.con.query(query, (err, result) => {
        if (err) { callback(err); } else {
          callback(null, result);
        }
      });
    }
  }
};

