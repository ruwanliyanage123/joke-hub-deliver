const databaseConnection = require("../database/database");

class Joke {
  constructor(jokeTitle, jokeType, jokeDescription, _id) {
    this.jokeTitle = jokeTitle;
    this.jokeType = jokeType;
    this.jokeDescription = jokeDescription;
    this._id = _id;
  }

  static async save(joke) {
    const connection = await databaseConnection();
    const [result] = await connection.execute(
      "INSERT INTO jokes (jokeTitle, jokeType, jokeDescription, jokeReference) VALUES (?, ?, ?, ?)",
      [joke.jokeTitle, joke.jokeType, joke.jokeDescription, joke._id]
    );
    return result;
  }

  static async findById(id) {
    const connection = await databaseConnection();
    const [rows] = await connection.execute(
      "SELECT * FROM jokes WHERE jokeReference = ?",
      [id]
    );
    return rows[0];
  }

  static async findAll() {
    const connection = await databaseConnection();
    const [rows] = await connection.execute("SELECT * FROM jokes");
    return rows;
  }

  static async findRandomByType(type) {
    const connection = await databaseConnection();
    const [rows] = await connection.execute(
      "SELECT * FROM jokes WHERE jokeType = ? ORDER BY RAND() LIMIT 1",
      [type]
    );
    return rows[0];
  }

  static async findDistinctTypes() {
    const connection = await databaseConnection();
    const [rows] = await connection.execute(
      "SELECT DISTINCT jokeType FROM jokes"
    );
    return rows.map((row) => row.jokeType);
  }

  static async updateById(id, joke) {
    const connection = await databaseConnection();
    const [result] = await connection.execute(
      "UPDATE jokes SET jokeTitle = ?, jokeType = ?, jokeDescription = ? WHERE jokeReference = ?",
      [joke.jokeTitle, joke.jokeType, joke.jokeDescription, id]
    );
    return result;
  }

  static async deleteById(id) {
    const connection = await databaseConnection();
    const [result] = await connection.execute(
      "DELETE FROM jokes WHERE jokeReference = ?",
      [id]
    );
    return result;
  }
}

module.exports = Joke;
