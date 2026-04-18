import { pool } from "./pool.js";

// checks if the database connection is working
export const checkConnection = async () => {
  try {
    const { rows } = await pool.query("SELECT NOW()");
    console.log("Connection is working", rows[0].now);
  } catch (err) {
    console.log("cant connect to db, queries.js,", err);
  }
};

// main function to insert a game and its genres
// 1. inserts the game into games table
// 2. links the game to its genres in game_genres table
export const insertGame = async (game) => {
  try {
    const game_id = await insertGameToGameDb(game);
    await insertGameToGameGenreDb(game_id, game.genres);
  } catch (err) {
    console.log("failed to insert game, queries.js,", err);
  }
};

// inserts a single genre string into the genres table
export const insertGenre = async (genre) => {
  try {
    await pool.query(`INSERT INTO genres (genre) VALUES ($1)`, [genre]);
  } catch (err) {
    console.log("failed to insert into genre, queries.js,", err);
  }
};

// inserts a game into the games table, returns the generated id
const insertGameToGameDb = async (game) => {
  try {
    const { rows } = await pool.query(
      `INSERT INTO games (title, developer, price, stock, cover_image)
      VALUES ($1, $2, $3, $4, $5) RETURNING id`,
      [game.title, game.developer, game.price, game.stock, game.cover_image],
    );
    return rows[0].id;
  } catch (err) {
    console.log("failed to insert game to games table, queries.js,", err);
  }
};

// links a game to its genres using the game_genres junction table
const insertGameToGameGenreDb = async (game_id, genres) => {
  try {
    for (const genre of genres) {
      const genre_id = await getGenreID(genre);
      await pool.query(
        `INSERT INTO game_genres (game_id, genre_id) VALUES ($1, $2)`,
        [game_id, genre_id],
      );
    }
  } catch (err) {
    console.log("failed to insert into game_genres, queries.js,", err);
  }
};

// fetches the id of a genre by its name
const getGenreID = async (genre) => {
  try {
    const { rows } = await pool.query(
      `SELECT id FROM genres WHERE genre = $1`,
      [genre],
    );
    return rows[0].id;
  } catch (err) {
    console.log("cant get genre id, queries.js,", err);
  }
};
