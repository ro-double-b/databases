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
      password: 'Stark',
      database: 'chat'
    });
    dbConnection.connect();

    /* Empty the db table before each test so that multiple tests
     * (or repeated runs of the tests) won't screw each other up: */
    dbConnection.query('SET FOREIGN_KEY_CHECKS = 0');
    dbConnection.query('truncate messages');
    dbConnection.query('truncate users');
    dbConnection.query('truncate rooms');
    dbConnection.query('SET FOREIGN_KEY_CHECKS = 1', done);
  });

  afterEach(function() {
    dbConnection.end();
  });

  it('Should insert posted messages to the DB', function(done) {
    // Post the user to the chat server.
    request({
      method: 'POST',
      uri: 'http://127.0.0.1:3000/classes/users',
      json: { username: 'Valjean' }
    }, function () {
      // Post a message to the node chat server:
      request({
        method: 'POST',
        uri: 'http://127.0.0.1:3000/classes/messages',
        json: {
          username: 'Valjean',
          message: 'In mercys name, three days is all I need.',
          roomname: 'Hello'
        }
      }, function () {
        // Now if we look in the database, we should find the
        // posted message there.

        // TODO: You might have to change this test to get all the data from
        // your message table, since this is schema-dependent.
        var queryString = 'SELECT * FROM messages';
        var queryArgs = [];

        dbConnection.query(queryString, queryArgs, function(err, results) {
          // Should have one result:
          expect(results.length).to.equal(1);

          // TODO: If you don't have a column named text, change this test.
          expect(results[0].msg).to.equal('In mercys name, three days is all I need.');

          done();
        });
      });
    });
  });

  it('Should output all messages from the DB', function(done) {
      // TODO - The exact query string and query args to use
    // here depend on the schema you design, so I'll leave
    // them up to you. */
    // dbConnection.query(`INSERT INTO users (username) VALUES ('test2')`);
    // dbConnection.query(`INSERT INTO rooms (roomname) VALUES ('test2')`);
    // dbConnection.query(`INSERT INTO messages (text, user_id, room_id) VALUES ('Men like you can never change!',
    //     (SELECT u.id FROM users u WHERE u.username = 'test2'),
    //     (SELECT r.id FROM rooms r WHERE r.roomname = 'test2'))`);

    dbConnection.query(`INSERT INTO users (username) VALUES ('Javert')`);
    dbConnection.query(`INSERT INTO rooms (roomname) VALUES ('main')`);
    dbConnection.query(`INSERT INTO messages (text, user_id, room_id) VALUES ('Men like you can never change!',
        (SELECT u.id FROM users u WHERE u.username = 'Javert'),
        (SELECT r.id FROM rooms r WHERE r.roomname = 'main'))`, function(err) {
      console.log('In callback');
      if (err) { throw err; }


    // Now query the Node chat server and see if it returns
    // the message we just inserted:
      request('http://127.0.0.1:3000/classes/messages', function(error, response, body) {
        // Should return the messages in memory from the client
        console.log('In request callback \n', 'Body:', body);
        var messageLog = JSON.parse(body);
        // This first message from client should have this message
        expect(messageLog[0].text).to.equal('Men like you can never change!');
        // The first message from client should have this room
        expect(messageLog[0].roomname).to.equal('main');
        done();
      });
    });
  });
});
