import path from "node:path";
import express from "express";
import { populateDB } from "./src/model/populateDb.js";
const __dirname = import.meta.dirname;

//routes
import indexRouter from "./src/routes/indexRouter.js";
import gameRouter from "./src/routes/gameRouter.js";
import genreRouter from "./src/routes/genreRoutes.js";

const app = express();

app.set("views", path.join(__dirname, "src/views"));
app.set("view engine", "ejs");
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));
await populateDB();

app.use((req, res, next) => {
  res.locals.currentPath = req.path;
  next();
});

app.use("/", indexRouter);
app.use("/game", gameRouter);
app.use("/genre", genreRouter);

app.listen(3000, (err) => {
  if (err) {
    console.log(err);
  }
  console.log("Listening to Localhost:3000");
});
