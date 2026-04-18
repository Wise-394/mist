import { Router } from "express";
import {
  getGenreController,
  postGenreController,
  putGenreController,
  deleteGenreController,
} from "../controller/genreController.js";

const genreRouter = Router();

genreRouter.get("/", getGenreController);
genreRouter.post("/", postGenreController);
genreRouter.put("/:id", putGenreController);
genreRouter.delete("/:id", deleteGenreController);

export default genreRouter;
