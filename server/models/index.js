var db = require('../db');

module.exports = {
  messages: {

    // A function which produces all the messages
    get: function (callback) {
      let query = 'SELECT message_text, roomname FROM messages';
      db.con.query(query, (err, result) => {
        if (err) { callback(err); } else {
          callback(null, result);
        }
      });
    },

    // A function which writes a message to the db
    post: function (request, callback) {
      // let text = JSON.stringify(request.text);
      let text = request.text;
      console.log('request.text: ', request.text);
      let query = `INSERT INTO messages (message_text, roomname) VALUES ('${text}', '${request.roomname}')`;
      // work on the auto increment
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
      query = `INSERT INTO users (username) VALUES('${JSON.stringify(response.username)}');`;
      db.con.query(query, (err, result) => {
        if (err) { callback(err); } else {
          callback(null, result);
        }
      });
    }
  }
};

