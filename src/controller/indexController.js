import console from 'node:console';
import multer from 'multer';
import { getGames, getGenres, insertGame } from '../model/queries.js';
import { Game } from '../model/gameClass.js';

const upload = multer({ storage: multer.memoryStorage() });

export const getIndexController = async (req, res) => {
  const genre = req.query.genre || null;
  const games = await getGames(genre);
  const genres = await getGenres();
  res.render('index', { games, genres });
};

export const postIndexController = [
  upload.single('image'),
  async (req, res) => {
    const game = new Game({
      title: req.body.title,
      developer: req.body.developer,
      price: req.body.price,
      stock: req.body.stock,
      cover_image: req.file.buffer,
      cover_image_type: req.file.mimetype,
      genres: Array.isArray(req.body.genres)
        ? req.body.genres
        : [req.body.genres],
    });
    await insertGame(game);
    res.redirect('/');
  },
];
