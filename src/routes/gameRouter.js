import { Router } from "express";
import { getGameController } from "../controller/gameController.js";

const gameRouter = Router();

gameRouter.get("/:id", getGameController);
// indexRouter.post("/", postIndex);

export default gameRouter;
