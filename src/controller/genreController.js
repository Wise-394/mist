import {
  getGenres,
  insertGenre,
  updateGenre,
  deleteGenre,
} from "../model/queries.js";

export const getGenreController = async (req, res) => {
  const genres = await getGenres();
  res.render("genre", { genres });
};

export const postGenreController = async (req, res) => {
  const genre = req.body.genre;
  await insertGenre(genre);
  res.redirect("/genre");
};

export const putGenreController = async (req, res) => {
  const id = req.params.id;
  await updateGenre(id, req.body.genre);
  res.redirect("/genre");
};

export const deleteGenreController = async (req, res) => {
  const id = req.params.id;
  await deleteGenre(id);
  res.redirect("/genre");
};
