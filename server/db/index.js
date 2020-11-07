var mysql = require('mysql');
const db = require('../models');
const { Sequelize } = require('sequelize');

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".


// var con = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'chat'
// });

// con.connect();


const sequelize = new Sequelize('chat', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

var messages = sequelize.define('messages', {
  id: {
    type: Sequelize.INTEGER(10),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  message_text: Sequelize.STRING(200),
  roomname: Sequelize.STRING(20)
});

var users = sequelize.define('users', {
  id: {
    type: Sequelize.INTEGER(10),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  username: Sequelize.STRING(20)
});



module.exports.sequelize = sequelize;
module.exports.users = users;
module.exports.messages = messages;
global.sequelize = sequelize;