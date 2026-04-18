import console from "node:console";
import { getGames, insertGame } from "../model/queries.js";
import { Game } from "../model/gameClass.js";

export const getIndexController = async (req, res) => {
  const genre = req.query.genre || null;
  const games = await getGames(genre);
  res.render("index", { games });
};

export const postIndexController = async (req, res) => {
  const game = new Game({
    title: req.body.title,
    developer: req.body.developer,
    price: req.body.price,
    stock: req.body.stock,
    cover_image: null,
    genres: Array.isArray(req.body.genres)
      ? req.body.genres
      : [req.body.genres],
  });
  await insertGame(game);
  res.redirect("/");
};
