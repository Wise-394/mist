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
    .isLength({ min: 2, max: 75 })
    .withMessage('Title must be between 2 and 100 characters')
    .escape(),

  body('developer')
    .trim()
    .notEmpty()
    .withMessage('Developer is required')
    .isLength({ max: 75 })
    .withMessage('Developer name too long')
    .escape(),

  body('price')
    .trim()
    .notEmpty()
    .withMessage('Price is required')
    .isFloat({ min: 0, max: 9999.99 })
    .withMessage('Price must be between $0 and $9,999.99')
    .custom((value) => /^\d+(\.\d{1,2})?$/.test(value))
    .withMessage('Price has too many decimal places'),

  body('stock')
    .trim()
    .notEmpty()
    .withMessage('Stock is required')
    .isInt({ min: 0, max: 999999 })
    .withMessage('Stock must be a whole number between 0 and 999999'),

  body('genres')
    .customSanitizer((value) => {
      if (!value) return [];
      return Array.isArray(value) ? value : [value];
    })
    .isArray({ min: 1 })
    .withMessage('Please select at least one genre'),

  body('image').custom((value, { req }) => {
    if (req.method === 'POST' && !req.file) {
      throw new Error('A cover image is required');
    }

    if (req.file) {
      const extension = req.file.mimetype.split('/')[1];
      const validExtensions = ['jpeg', 'jpg', 'png', 'webp'];
      if (!validExtensions.includes(extension)) {
        throw new Error('Invalid image format. Use JPG, PNG, or WebP');
      }
    }
    return true;
  }),
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
