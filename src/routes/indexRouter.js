import { Router } from "express";
import { checkConnection } from "../model/queries.js";
import {
  getIndexController,
  postIndexController,
} from "../controller/indexController.js";
const indexRouter = Router();

indexRouter.get("/", getIndexController);
indexRouter.post("/", postIndexController);

export default indexRouter;
