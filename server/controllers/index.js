var models = require('../models');
const db = require('../db');
const bluebird = require('bluebird');
const sequelize = require('sequelize');


module.exports = {

  messages: {

    get: function (req, res) {
      db.messages.findAll()
        .then((err, result)=> {
          if (err) {
            throw err;
          } else {
            res.status(201).json(result);
          }
        });
    },

    post: function (req, res) {
      // console.log(req.body["username"])
      db.users.findOrCreate({where: {username: req.body['username']}})
        .then((err, result)=>{
          let msg = {
            id: result,
            message_text: req.body['text'],
            roomname: req.body['roomname']
          };
          db.messages.create(msg)
            .then((err, result) => {
              if (err) {
                throw err;
              } else {
                res.status(201);
              }
            })
            .catch(err);
        })
        .catch(err);
    }
  },

  users: {

    get: function (req, res) {
      db.users.findAll()
        .then((err, result) => {
          if (err) {
            throw err;
          } else {
            res.status(201).json(result);
          }
        });
    },

    post: function (req, res) {
      db.users.create(req.body)
        .then((err, result) => {
          if (err) {
            throw err;
          } else {
            res.status(201);
          }
        });
    }
  }
};




