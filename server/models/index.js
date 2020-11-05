var db = require('../db');

module.exports = {
  messages: {
    get: function (query) {
      query = `SELECT message_text FROM messagess WHERE message_text = ${query.text}`;
      db.con.query(query, callback => {
        if (err) { throw err; }
        console.log('result: ', result);
        callback(err, result);
      });
    }, // a function which produces all the messages
    post: function (query) {
      query = `INSERT INTO messages (message_id, message_text) VALUES(1, ${query.message});`;
      db.con.query(query, (err, result) => {
        if (err) { throw err; }
        console.log('result: ', result);
      });
    }
  },


  users: {
    // Ditto as above.
    get: function (query) {
      query = `SELECT username FROM users WHERE username = ${query.name}`;
      db.con.query(query, (err, result) => {
        if (err) { throw err; }
        console.log('result: ', result);
        return result;
      });
    },
    post: function (query) {
      query = `INSERT INTO users (user_id, username) VALUES(1, ${query.name});`;
      db.con.query(query, (err, result) => {
        if (err) { throw err; }
        console.log('result: ', result);
        return result;
      });
    }
  }
};

