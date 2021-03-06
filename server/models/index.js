var db = require('../db');
 
// sends data to and from database
var sql = db.connection;

sql.connect();


module.exports = {
  messages: {
    get: function (cb) {
      // Create array of message objects
      console.log('GET at model');
      sql.query(`select m.objectId, u.username, r.roomname, m.text
        from users u inner join (messages m, rooms r) 
        on u.id = m.user_id AND r.id = m.room_id;`, 
        function(err, results, fields) {
          if (err) {
            console.error(err);
          }
          console.log('result in model',results);
          cb(results);
        });

// select u.username, m.msg, r.roomname from users u inner join (messages m, rooms r) on (u.id = m.user_id AND r.id = m.room_id);

    }, // a function which produces all the messages
    post: function (message) {
      sql.query(`INSERT INTO users (username) VALUES ('${message.username}');`, 
        (err, result, field) => {
          if (err) {
            console.error(err);
          } else {
            console.log(result);
          }
        });
      sql.query(`INSERT INTO rooms (roomname) VALUES ('${message.roomname}')`, 
        (err, result, fields ) => {
          if (err) {
            console.error(err);
          } else {
            console.log('Room logged');
          }
        });
      sql.query(`INSERT INTO messages (text, user_id, room_id) VALUES ('${message.text}',
                (SELECT u.id FROM users u WHERE u.username = '${message.username}'),
                (SELECT r.id FROM rooms r WHERE r.roomname = '${message.roomname}'))`,
        (err, results, fields) => {
          if (err) {
            console.error('post query error', err);
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
      
    }
  }
};

