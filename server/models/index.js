var db = require('../db');

// sends data to and from database
var sql = db.connection;

sql.connect();


module.exports = {
  messages: {
    get: function () {}, // a function which produces all the messages
    post: function (message) {
      // console.log(message.username)
      // sql.query(`INSERT INTO messages VALUES(1,
      //   2,
      //   '${message.message}',
      //   1);`, function(err, results, fields) {
      //   if (err) {
      //     throw err;
      //   } else console.log('Results from query:', results);
      // })
      // console.log(message);
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function (user) {

    },
    post: function (user) {
      console.log(user);     
      sql.query(`INSERT INTO users (name) 
        VALUES ('${user}');`, (err, result, field) => {
        if (err) {
          throw err;
        } else {
          console.log(result);
        }
      });
    }
  }
};

