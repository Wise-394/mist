import { Router } from "express";
import { checkConnection } from "../model/queries.js";
import { getIndex, postIndex } from "../controller/indexController.js";
const indexRouter = Router();

indexRouter.get("/", getIndex);
indexRouter.post("/", postIndex);

export default indexRouter;
