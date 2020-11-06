var models = require('../models');

module.exports = {
  messages: {

    // A function which handles a get request for all messages
    get: function (req, res) {

      let result = models.messages.get();
      if (!result) {
        res.status(404).send('Fail');
      } else {
        res.status(200).end(result);
      }
      // We get all messages
      // We send in response an object of arrays containing the messages
      console.log('This is trying to get messages');
    },

    // A function which handles posting a message to the database
    post: function (req, res) {
      // We may need promise here
      let result = models.messages.post(req.body);
      if (result === undefined) {
        res.status(404).send('Fail');
      } else {
        res.status(200).end(result);
      }
      console.log('Post request received: message', req.body);
      // console.log(req)
      /*
      This is how the message object looks when it gets sent to the server
      {
        text: '',
        username: '',
        roomname: ''
      }
      */
    }
  },

  users: {

    // A function which handles a get request for a specific user's messages?
    get: function (req, res) {
      console.log('This is trying to get users');
      // console.log(req);
    },

    // A function which handles posting a user to the database. Only happens at the beginning of the client interaction. Right?
    post: function (req, res) {
      // Expecting a string?
      console.log('Post request received: user');
    }
  }
};



