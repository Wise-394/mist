import {
  getGenres,
  insertGenre,
  updateGenre,
  deleteGenre,
} from '../model/queries.js';
import { body, validationResult } from 'express-validator';

const validateInput = [
  body('genre')
    .trim()
    .notEmpty()
    .withMessage('genre must not be empty')
    .isLength({ max: 20 })
    .withMessage('genre must be within 20 characters'),
];

export const getGenreController = async (req, res) => {
  const genres = await getGenres();
  res.render('genre', { genres, errors: [] });
};

export const postGenreController = [
  validateInput,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const genres = await getGenres();
      return res.status(400).render('genre', {
        genres,
        errors: errors.array(),
      });
    }

    await insertGenre(req.body.genre);
    res.redirect('/genre');
  },
];

export const putGenreController = [
  validateInput,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const genres = await getGenres();
      return res.status(400).render('genre', {
        genres,
        errors: errors.array(),
      });
    }

    await updateGenre(req.params.id, req.body.genre);
    res.redirect('/genre');
  },
];

export const deleteGenreController = async (req, res) => {
  const password = process.env.PASSWORD;

  if (password !== req.body.password) {
    return res.status(401).json({ error: 'Incorrect password' });
  }

  await deleteGenre(req.params.id);
  res.sendStatus(200);
};
