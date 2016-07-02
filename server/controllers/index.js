var models = require('../models');

// takes user input and sends to model index (to be processed)

module.exports = {
  messages: {
    get: function (req, res) {
      // Send data from model to client
      console.log ( 'GET at model');
      models.messages.get(data => {

      });
      // res.end();
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      models.messages.post(req.body);
      res.end();
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      models.messages.get();
      res.end();
    },
    post: function (req, res) {
      models.users.post(req.body.username);
      res.end();
    }
  }
};

