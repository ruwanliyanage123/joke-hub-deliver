const Joke = require("../model/joke");
const express = require("express");
const bodyParser = require("body-parser");
const databaseConnection = require("../database/database");
const cors = require("cors");
const PORT = 3005;
const app = express();

// Use the cors middleware
app.use(cors());
databaseConnection();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

app.post("/api/createJoke", async (req, res) => {
  const { jokeTitle, jokeType, jokeDescription } = req.body;
  const joke = new Joke({
    jokeTitle,
    jokeType,
    jokeDescription,
  });
  try {
    await joke.save();
    res.status(201).send({ message: "Joke created successfully", joke });
  } catch (error) {
    res.status(500).send({ message: "Error creating joke", error });
  }
});

app.get("/api/getJokeById/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const joke = await Joke.findById(id);
    res.send(joke);
  } catch (error) {
    res.status(500).send({ message: "Error getting joke", error });
  }
});

app.get("/api/getRandomJokeByType/:type", async (req, res) => {
  const { type } = req.params;
  try {
    const jokes = await Joke.aggregate([
      { $match: { jokeType: type } },
      { $sample: { size: 1 } },
    ]);
    if (jokes.length > 0) {
      res.send(jokes[0]);
    } else {
      res.status(404).send({ message: "No joke found with the given title" });
    }
  } catch (error) {
    res.status(500).send({ message: "Error getting joke", error });
  }
});

app.get("/api/getActiveTypes", async (req, res) => {
  try {
    const jokeTypes = await Joke.distinct("jokeType");
    res.status(200).send(jokeTypes);
  } catch (error) {
    res.status(500).send({ message: "Error getting joke types", error });
  }
});

app.get("/api/getAllJokes", async (req, res) => {
  try {
    const jokes = await Joke.find();
    res.send(jokes);
  } catch (error) {
    res.status(500).send({ message: "Error getting jokes", error });
  }
});

app.put("/api/updateJoke/:id", async (req, res) => {
  const { id } = req.params;
  const { jokeTitle, jokeType, jokeDescription } = req.body;
  try {
    await Joke.findByIdAndUpdate(id, { jokeTitle, jokeType, jokeDescription });
    res.send({ message: "Joke updated successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error updating joke", error });
  }
});

app.delete("/api/deleteJoke/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Joke.findByIdAndDelete(id);
    res.send({ message: "Joke deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error deleting joke", error });
  }
});
