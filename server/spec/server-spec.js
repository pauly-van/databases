/* You'll need to have MySQL running and your Node server running
 * for these tests to pass. */

var mysql = require('mysql');
var request = require('request'); // You might need to npm install the request module!
var expect = require('chai').expect;

describe('Persistent Node Chat Server', function() {
  var dbConnection;

  beforeEach(function(done) {
    dbConnection = mysql.createConnection({
      user: 'root',
      password: '',
      database: 'chat'
    });
    dbConnection.connect();

    var tablename = 'messages'; // TODO: fill this out

    /* Empty the db table before each test so that multiple tests
     * (or repeated runs of the tests) won't screw each other up: */
    dbConnection.query('truncate ' + tablename, done);
  });

  afterEach(function() {
    dbConnection.end();
  });

  it('Should insert posted messages to the DB', function(done) {
    // Post the user to the chat server.
    request({
      method: 'POST',
      url: 'http://localhost:3000/classes/users',
      json: { username: 'Valjean' }
    }, function () {
      // Post a message to the node chat server:
      request({
        method: 'POST',
        url: 'http://localhost:3000/classes/messages',
        json: {
          'username': 'Valjean',
          'text': 'In mercys name, three days is all I need.',
          'roomname': 'Hello'
        }
      }, function () {
        // Now if we look in the database, we should find the
        // posted message there.

        // TODO: You might have to change this test to get all the data from
        // your message table, since this is schema-dependent.
        var queryString = 'SELECT message_text FROM messages';
        var queryArgs = [];

        dbConnection.query(queryString, queryArgs, function(err, results) {
          // Should have one result:
          expect(results.length).to.equal(1);

          // TODO: If you don't have a column named text, change this test.
          expect(results[0].message_text).to.equal('In mercys name, three days is all I need.');

          done();
        });
      });
    });
    done();
  });

  it('Should insert roomname when adding a message', function(done) {
    request({
      method: 'POST',
      url: 'http://localhost:3000/classes/users',
      json: { username: 'Valjean' }
    }, function () {
      // Post a message to the node chat server:
      request({
        method: 'POST',
        url: 'http://localhost:3000/classes/messages',
        json: {
          'username': 'Valjean',
          'text': 'In mercys name, three days is all I need.',
          'roomname': 'Hello'
        }

      }, function () {
        var queryString = "select roomname from messages";
        var queryArgs = [];
        dbConnection.query(queryString, queryArgs, function(err, results) {
          // Should have one result:
          expect(results.length).to.equal(1);

          // TODO: If you don't have a column named text, change this test.
          expect(results[0].message.roomname).to.equal('Hello');

          done();
        });
      });
    });
    done();
  });

  it('Should output all messages from the DB', function(done) {
    dbConnection.query('insert into messages (message_text, roomname) values (\'Men like you can never change!\', \'main\')', (err, result)=> {
      if (err) {
        throw err;
      } else {
        console.log('should output messages from db - adding a message', result);
      }
    });
    // Let's insert a message into the db
    var queryString = 'select * from messages';
    var queryArgs = [];
    // TODO - The exact query string and query args to use
    // here depend on the schema you design, so I'll leave
    // them up to you. */

    dbConnection.query(queryString, queryArgs, function(err) {
      if (err) { throw err; }

      // Now query the Node chat server and see if it returns
      // the message we just inserted:
      request('http://localhost:3000/classes/messages', function(error, response, body) {
        var messageLog = JSON.parse(body);
        console.log('MESSAGELOG: ', messageLog);
        expect(messageLog[0].message_text).to.equal('Men like you can never change!');
        expect(messageLog[0].roomname).to.equal('main');
        done();
      });
      done();
    });
  });

  it('Should output a message with a specific roomname', function(done) {
    dbConnection.query('insert into messages (message_text, roomname) values (\'Hello, testing. Please work\', \'main2\')', (err, result)=> {
      if (err) {
        throw err;
      } else {
        console.log('should output messages from db - adding a message', result);
      }
    });
    dbConnection.query('insert into messages (message_text, roomname) values (\'Men like you can never change!\', \'main\')', (err, result)=> {
      if (err) {
        throw err;
      } else {
        console.log('should output messages from db - adding a message', result);
      }
    });
    // Let's insert a message into the db
    var queryString = "select roomname from messages where roomname = 'main'";
    var queryArgs = [];
    // TODO - The exact query string and query args to use
    // here depend on the schema you design, so I'll leave
    // them up to you. */

    dbConnection.query(queryString, queryArgs, function(err) {
      if (err) { throw err; }

      // Now query the Node chat server and see if it returns
      // the message we just inserted:
      request('http://localhost:3000/classes/messages', function(error, response, body) {
        var messageLog = JSON.parse(body);
        console.log('MESSAGELOG: ', messageLog);
        expect(results.length).to.equal(1);
        expect(messageLog[0].message_text).to.equal('Men like you can never change!');
        expect(messageLog[0].roomname).to.equal('main');
        done();
      });
      done();
    });
  });
});
