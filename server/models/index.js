var db = require('../db');
 
// sends data to and from database
var sql = db.connection;

sql.connect();


module.exports = {
  messages: {
    get: function (cb) {
      // Create array of message objects
      console.log('GET at controller');
      sql.query(`SELECT * FROM messages;`, function(err, results, fields) {
        if (err) {
          console.error(err);
        }
        cb(results)
      });


    }, // a function which produces all the messages
    post: function (message) {

      sql.query(`INSERT INTO rooms (name) VALUES ('${message.roomname}')`, 
        (err, result, fields ) => {
          if (err) {
            throw err;
          } else {
            console.log('Room logged');
          }
        });
      sql.query(`INSERT INTO messages (msg, user_id, room_id) VALUES ('${message.message}',
                (SELECT u.id FROM users u WHERE u.name = '${message.username}'),
                (SELECT r.id FROM rooms r WHERE r.name = '${message.roomname}'))`,
        (err, results, fields) => {
          if (err) {
            console.error(err);
          } else {
            console.log('Results from query:', results);
          }
        });
    } // a function which can be used to insert a message into the database
  },
 
  users: {
    // Ditto as above.
    get: function () {
      sql.query(`SELECT * FROM messages`, function(err, results, fields) {
        console.log('get users', results);
      });

    },
    post: function (user) {
      console.log(user);     
      sql.query(`INSERT INTO users (name) 
        VALUES ('${user}');`, (err, result, field) => {
        if (err) {
          console.error(err);
        } else {
          console.log(result);
        }
      });
    }
  }
};

