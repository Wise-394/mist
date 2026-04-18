import { Router } from "express";
import {
  getGameController,
  postGameController,
} from "../controller/gameController.js";

const gameRouter = Router();

gameRouter.get("/:id", getGameController);
gameRouter.post("/", postGameController);

export default gameRouter;
