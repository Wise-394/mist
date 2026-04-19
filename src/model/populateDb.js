import { pool } from './pool.js';
import {
  initialGenre,
  dota2,
  csgo,
  sts,
  leagueOfLegends,
  valorant,
  tf2,
  hades,
  deadCells,
  enterTheGungeon,
  apexLegends,
} from './initialData.js';
import { insertGame, insertGenre } from './queries.js';
const client = await pool.connect();

export const populateDB = async () => {
  await createGameTable();
  await createGenreTable();
  await createGameGenresTable();
  await populateGenres();
  await populateGames();
  client.release();
};

const createGameTable = async () => {
  try {
    await client.query(`
    CREATE TABLE IF NOT EXISTS games (
      id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      title VARCHAR(75) NOT NULL,
      developer VARCHAR(75) NOT NULL,
      price DECIMAL(10, 2) NOT NULL,
      stock INT NOT NULL DEFAULT 0,
      cover_image BYTEA,
      cover_image_type VARCHAR(50)
    );
  `);
  } catch (err) {
    console.log('failed to create game table, populateDb.js,', err);
  }
};

const createGenreTable = async () => {
  try {
    await client.query(`
        CREATE TABLE IF NOT EXISTS genres (
        id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        genre VARCHAR (50) NOT NULL
        );    
            `);
  } catch (err) {
    console.log('failed to create genre table, populateDb.js,', err);
  }
};

const createGameGenresTable = async () => {
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS game_genres (
        game_id INT REFERENCES games(id) ON DELETE CASCADE,
        genre_id INT REFERENCES genres(id) ON DELETE CASCADE,
        PRIMARY KEY (game_id, genre_id)
      );
    `);
  } catch (err) {
    console.log('failed to create genre table, populateDb.js,', err);
  }
};

const populateGenres = async () => {
  try {
    const { rows } = await client.query(`SELECT * FROM genres`);
    if (rows.length > 0) {
      console.log('genres already populated, skipping...');
      return;
    }
    for (const genre of initialGenre) {
      await insertGenre(genre);
    }
  } catch (err) {
    console.log('failed to populate genres, populateDb.js,', err);
  }
};

const populateGames = async () => {
  try {
    const { rows } = await client.query(`SELECT * FROM games`);
    if (rows.length > 0) {
      console.log('games already populated, skipping...');
      return;
    }
    await insertGame(dota2);
    await insertGame(csgo);
    await insertGame(sts);
    await insertGame(leagueOfLegends);
    await insertGame(valorant);
    await insertGame(tf2);
    await insertGame(hades);
    await insertGame(deadCells);
    await insertGame(enterTheGungeon);
    await insertGame(apexLegends);
  } catch (err) {
    console.log('failed to populate games, populateDb.js,', err);
  }
};
