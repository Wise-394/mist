import {
  getGame,
  updateGame,
  deleteGame,
  getGenres,
} from '../model/queries.js';
import { Game } from '../model/gameClass.js';
import { body, validationResult } from 'express-validator';

const validateGame = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 50 })
    .withMessage('Title must be under 50 characters'),
  body('developer').trim().notEmpty().withMessage('Developer is required'),
  body('price')
    .isFloat({ min: 0 })
    .withMessage('Price must be a valid positive number'),
  body('stock')
    .isInt({ min: 0 })
    .withMessage('Stock cannot be a negative number'),
  body('genres')
    .toArray()
    .isLength({ min: 1 })
    .withMessage('Please select at least one genre'),
];

export const getGameController = async (req, res, next) => {
  try {
    const game = await getGame(req.params.id);
    const genres = await getGenres();

    if (!game) {
      return res.status(404).send('Game not found');
    }

    res.render('game', {
      game,
      genres,
      errors: [],
    });
  } catch (err) {
    next(err);
  }
};

export const postGameController = [
  validateGame,
  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      try {
        const game = await getGame(req.params.id);
        const genres = await getGenres();

        return res.status(400).render('game', {
          game: {
            ...game,
            id: req.params.id,
          },
          genres,
          errors: errors.array(),
        });
      } catch (err) {
        return next(err);
      }
    }

    try {
      const updatedGame = new Game({
        id: req.params.id,
        title: req.body.title,
        developer: req.body.developer,
        price: req.body.price,
        stock: req.body.stock,
        cover_image: req.file ? req.file.buffer : null,
        cover_image_type: req.file ? req.file.mimetype : null,
        genres: req.body.genres,
      });

      await updateGame(updatedGame);
      res.redirect(`/game/${req.params.id}`);
    } catch (err) {
      next(err);
    }
  },
];

export const deleteGameController = async (req, res, next) => {
  try {
    const password = process.env.PASSWORD;

    if (password !== req.body.password) {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    await deleteGame(req.params.id);
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};
