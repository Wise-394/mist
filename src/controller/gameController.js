import { getGame, updateGame, deleteGame } from "../model/queries.js";
import { Game } from "../model/gameClass.js";

export const getGameController = async (req, res) => {
  const game = await getGame(req.params.id);
  res.render("game", { game });
};

export const postGameController = async (req, res) => {
  const game = new Game({
    id: req.params.id,
    title: req.body.title,
    developer: req.body.developer,
    price: req.body.price,
    stock: req.body.stock,
    cover_image: null,
    genres: Array.isArray(req.body.genres)
      ? req.body.genres
      : [req.body.genres],
  });
  await updateGame(game);
  res.redirect(`/games/${game.id}`);
};

export const deleteGameController = async (req, res) => {
  await deleteGame(req.params.id);
  res.redirect("/");
};
