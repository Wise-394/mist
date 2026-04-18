import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "node:path";
import express from "express";
const __dirname = import.meta.dirname;

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(3000, (err) => {
  if (err) {
    console.log(err);
  }
  console.log("Listening to Localhost:3000");
});
