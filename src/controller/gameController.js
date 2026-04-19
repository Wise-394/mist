import {
  getGame,
  updateGame,
  deleteGame,
  getGenres,
} from '../model/queries.js';
import { Game } from '../model/gameClass.js';

export const getGameController = async (req, res) => {
  const game = await getGame(req.params.id);
  const genres = await getGenres();
  res.render('game', { game, genres });
};

export const postGameController = async (req, res) => {
  const game = new Game({
    id: req.params.id,
    title: req.body.title,
    developer: req.body.developer,
    price: req.body.price,
    stock: req.body.stock,
    cover_image: req.file ? req.file.buffer : null,
    cover_image_type: req.file ? req.file.mimetype : null,
    genres: Array.isArray(req.body.genres)
      ? req.body.genres
      : [req.body.genres],
  });
  await updateGame(game);
  res.redirect(`/game/${req.params.id}`);
};

export const deleteGameController = async (req, res) => {
  const password = process.env.PASSWORD;

  if (password !== req.body.password) {
    return res.status(401).json({ error: 'Incorrect password' });
  }

  await deleteGame(req.params.id);
  res.sendStatus(200);
};
