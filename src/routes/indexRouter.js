import { Router } from "express";
import { checkConnection } from "../model/queries.js";
const indexRouter = Router();

indexRouter.get("/", (req, res) => {
  checkConnection();
  res.send("yes it working");
});

export default indexRouter;
