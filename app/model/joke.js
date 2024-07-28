const mongoose = require("mongoose");

const jokeSchema = new mongoose.Schema({
  jokeTitle: {
    type: String,
    required: true,
  },
  jokeType: {
    type: String,
    required: true,
  },
  jokeDescription: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Joke", jokeSchema);
