var db = require('../db/index');

module.exports = {
  messages: {

    get: function (callback) {
      let query = 'SELECT message_text, roomname FROM messages';
      db.con.query(query, (err, result) => {
        if (err) { callback(err); } else {
          callback(null, result);
        }
      });
    },

    post: function (request, callback) {
      let text = request.text;
      let query = `INSERT INTO messages (message_text, roomname) VALUES ('${text}', '${request.roomname}')`;
      db.con.query(query, (err, result) => {
        if (err) {
          callback(err);
        } else {
          console.log(result);
          callback(null, result);
        }
      });
    }
  },


  users: {

    get: function (callback) {
      db.con.query('SELECT * FROM users', (err, result) => {
        if (err) { callback(err); } else {
          callback(null, result);
        }
      });
    },

    post: function (response, callback) {
      query = `INSERT INTO users (username) VALUES('${JSON.stringify(response.username)}');`;
      db.con.query(query, (err, result) => {
        if (err) { callback(err); } else {
          callback(null, result);
        }
      });
    }
  }
};

