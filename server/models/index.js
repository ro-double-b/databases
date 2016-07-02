var db = require('../db');

// sends data to and from database
var sql = db.connection;

sql.connect();


module.exports = {
  messages: {
    get: function () {}, // a function which produces all the messages
    post: function (message) {
      console.log(message);
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function (user) {
      
    },
    post: function (user) {
      console.log(user);      
    }
  }
};

