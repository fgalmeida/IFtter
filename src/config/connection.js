const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://felipealmeida:StCbJJE8ItI7vtNw@daw.9rsahml.mongodb.net/blog?retryWrites=true&w=majority"
);

module.exports = mongoose;
