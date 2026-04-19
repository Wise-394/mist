import { pool } from './pool.js';

// ============================================================
// connection
// ============================================================

// checks if the database connection is working
export const checkConnection = async () => {
  try {
    const { rows } = await pool.query('SELECT NOW()');
    console.log('Connection is working', rows[0].now);
  } catch (err) {
    console.log('cant connect to db, queries.js,', err);
  }
};

// ============================================================
// games crud
// ============================================================

export const insertGame = async (game) => {
  try {
    const game_id = await insertGameToGameDb(game);
    await insertGameToGameGenreDb(game_id, game.genres);
  } catch (err) {
    console.log('failed to insert game, queries.js,', err);
  }
};

export const getGame = async (id) => {
  try {
    const { rows } = await pool.query(
      `SELECT games.*, array_remove(array_agg(genres.genre), null) AS genres
      FROM games
      LEFT JOIN game_genres ON games.id = game_genres.game_id
      LEFT JOIN genres ON game_genres.genre_id = genres.id
      WHERE games.id = $1
      GROUP BY games.id`,
      [id],
    );
    return rows[0];
  } catch (err) {
    console.log('failed to get game, queries.js,', err);
  }
};

export const getGames = async (genre = null) => {
  try {
    const { rows } = await pool.query(
      `SELECT games.*, array_remove(array_agg(genres.genre), null) AS genres
      FROM games
      LEFT JOIN game_genres ON games.id = game_genres.game_id
      LEFT JOIN genres ON game_genres.genre_id = genres.id
      GROUP BY games.id
      HAVING $1::text IS NULL OR bool_or(genres.genre ILIKE $1)`,
      [genre],
    );
    return rows;
  } catch (err) {
    console.log('failed to get games, queries.js,', err);
  }
};
export const updateGame = async (game) => {
  try {
    await pool.query(
      `UPDATE games SET 
        title = $1, 
        developer = $2, 
        price = $3, 
        stock = $4, 
        cover_image = COALESCE($5, cover_image),
        cover_image_type = COALESCE($6, cover_image_type)
      WHERE id = $7`,
      [
        game.title,
        game.developer,
        game.price,
        game.stock,
        game.cover_image,
        game.cover_image_type,
        game.id,
      ],
    );

    await pool.query(`DELETE FROM game_genres WHERE game_id = $1`, [game.id]);

    for (const genre of game.genres) {
      const genre_id = await getGenreID(genre);
      await pool.query(
        `INSERT INTO game_genres (game_id, genre_id) VALUES ($1, $2)`,
        [game.id, genre_id],
      );
    }
  } catch (err) {
    console.log('failed to update game, queries.js,', err);
  }
};

export const deleteGame = async (id) => {
  try {
    await pool.query(`DELETE FROM games WHERE id = $1`, [id]);
  } catch (err) {
    console.log('failed to delete game, queries.js,', err);
  }
};

// ============================================================
// genres crud
// ============================================================

export const insertGenre = async (genre) => {
  try {
    await pool.query(`INSERT INTO genres (genre) VALUES ($1)`, [genre]);
  } catch (err) {
    console.log('failed to insert into genre, queries.js,', err);
  }
};

export const getGenre = async (id) => {
  try {
    const { rows } = await pool.query(
      `SELECT genre FROM genres WHERE id = $1`,
      [id],
    );
    return rows[0];
  } catch (err) {
    console.log('failed to get genre, queries.js,', err);
  }
};
export const getGenres = async () => {
  try {
    const { rows } = await pool.query(`SELECT genre FROM genres`);
    return rows;
  } catch (err) {
    console.log('failed to get genre, queries.js,', err);
  }
};
export const updateGenre = async (id, genre) => {
  try {
    await pool.query(`UPDATE genres SET genre = $1 WHERE id = $2`, [genre, id]);
  } catch (err) {
    console.log('failed to update genre, queries.js,', err);
  }
};

export const deleteGenre = async (id) => {
  try {
    await pool.query(`DELETE FROM genres WHERE id = $1`, [id]);
  } catch (err) {
    console.log('failed to delete genre, queries.js,', err);
  }
};

// ============================================================
// helpers
// ============================================================

// inserts a game into the games table, returns the generated id
const insertGameToGameDb = async (game) => {
  try {
    const { rows } = await pool.query(
      `INSERT INTO games (title, developer, price, stock, cover_image, cover_image_type)
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
      [
        game.title,
        game.developer,
        game.price,
        game.stock,
        game.cover_image,
        game.cover_image_type,
      ],
    );
    return rows[0].id;
  } catch (err) {
    console.log('failed to insert game to games table, queries.js,', err);
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
    console.log('failed to insert into game_genres, queries.js,', err);
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
    console.log('cant get genre id, queries.js,', err);
  }
};
