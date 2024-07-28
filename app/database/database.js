const mongoose = require("mongoose");

const params = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const databaseConnection = () => {
  mongoose
    .connect("mongodb://localhost:27017/joke_hub", params)
    .then(() => console.log("Database connected successfully..."))
    .catch((err) => console.error("Database connection error:", err));
};

module.exports = databaseConnection;
