var models = require('../models');

module.exports = {
  messages: {

    // A function which handles a get request for all messages
    get: function (req, res) {
      models.messages.get((err, data)=>{
        if (err) {
          res.status(404).send('Messages not found').end();
          console.log('Error! ', err );
        } else {
          res.status(200).send(data).end();
          console.log('result from messages table is:', data);
        }
      });
      // We get all messages
      // We send in response an object of arrays containing the messages
    },

    // A function which handles posting a message to the database
    post: function (req, res) {
      models.messages.post(req.body, (err, data) =>{
        if (err) {
          res.status(500).send('Fail, can not save to database').end();
          console.log('Error! ', err);
        } else {
          res.send(data);
          console.log(data);
          res.status(200).end();
        }
      });
    }
  },

  users: {

    // A function which handles a get request for a specific user's messages?
    get: function (req, res) {
      models.users.get((err, data)=>{
        if (err) {
          res.status(404).send('User not found').end();
          console.log('Error! ', err);
        } else {
          res.status(200).send(data).end();
          console.log('result from user table is: ', data);
        }
      });
    },

    // A function which handles posting a user to the database. Only happens at the beginning of the client interaction. Right?
    post: function (req, res) {
      models.users.post(req.body, (err, data)=>{
        if (err) {
          res.status(500).send('Unable to save user to database').end();
          console.log('Error! ', err);
        } else {
          res.status(200).end();
        }
      });
    }
  }
};



