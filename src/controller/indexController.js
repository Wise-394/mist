import console from 'node:console';
import multer from 'multer';
import { getGames, getGenres, insertGame } from '../model/queries.js';
import { Game } from '../model/gameClass.js';
import { body, validationResult } from 'express-validator';

const upload = multer({ storage: multer.memoryStorage() });

const validateGame = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 75 })
    .withMessage('Title must be under 75 characters'),

  body('developer')
    .trim()
    .notEmpty()
    .withMessage('Developer is required')
    .isLength({ max: 75 })
    .withMessage('Developer name must be under 75 characters'),

  body('price')
    .trim()
    .isFloat({ min: 0 })
    .withMessage('Price must be a valid positive number'),

  body('stock')
    .trim()
    .isInt({ min: 0 })
    .withMessage('Stock cannot be a negative number'),

  body('genres')
    .customSanitizer((value) => {
      if (!value) return [];
      return Array.isArray(value) ? value : [value];
    })
    .isArray({ min: 1 })
    .withMessage('Please select at least one genre'),
];

export const getIndexController = async (req, res) => {
  const genre = req.query.genre || null;
  const games = await getGames(genre);
  const genres = await getGenres();
  res.render('index', { games, genres, errors: [] });
};

export const postIndexController = [
  upload.single('image'),
  ...validateGame,
  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const games = await getGames();
      const genres = await getGenres();

      return res.status(400).render('index', {
        games,
        genres,
        errors: errors.array(),
        previousInput: req.body,
      });
    }

    try {
      if (!req.file) {
        throw new Error('Image upload failed');
      }

      const game = new Game({
        title: req.body.title,
        developer: req.body.developer,
        price: req.body.price,
        stock: req.body.stock,
        cover_image: req.file.buffer,
        cover_image_type: req.file.mimetype,
        genres: req.body.genres,
      });

      await insertGame(game);
      res.redirect('/');
    } catch (err) {
      console.error(err);
      next(err);
    }
  },
];
