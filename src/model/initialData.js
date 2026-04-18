import { Game } from "./gameClass.js";

export const initialGenre = [
  "Action",
  "MOBA",
  "First Person Shooter",
  "Roguelike",
];

export const dota2 = new Game({
  title: "Dota 2",
  developer: "Valve",
  price: 0,
  stock: 99,
  cover_image: null,
  genres: ["MOBA", "Action"],
});

export const csgo = new Game({
  title: "Counter-Strike 2",
  developer: "Valve",
  price: 0,
  stock: 99,
  cover_image: null,
  genres: ["First Person Shooter", "Action"],
});

export const sts = new Game({
  title: "Slay the Spire",
  developer: "MegaCrit",
  price: 25,
  stock: 99,
  cover_image: null,
  genres: ["Roguelike"],
});
