import { Game } from "./gameClass.js";

export const initialGenre = [
  "Action",
  "Adventure",
  "RPG",
  "MOBA",
  "First Person Shooter",
  "Third Person Shooter",
  "Roguelike",
  "Strategy",
  "Simulation",
  "Sports",
  "Fighting",
  "Platformer",
  "Horror",
  "Puzzle",
  "Stealth",
];

export const dota2 = new Game({
  title: "Dota 2",
  developer: "Valve",
  price: 0,
  stock: 99,
  cover_image: null,
  genres: ["MOBA", "Strategy", "Action"],
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
  genres: ["Roguelike", "Strategy"],
});

export const leagueOfLegends = new Game({
  title: "League of Legends",
  developer: "Riot Games",
  price: 0,
  stock: 99,
  cover_image: null,
  genres: ["MOBA", "Strategy", "Action"],
});

export const valorant = new Game({
  title: "Valorant",
  developer: "Riot Games",
  price: 0,
  stock: 99,
  cover_image: null,
  genres: ["First Person Shooter", "Action", "Strategy"],
});

export const tf2 = new Game({
  title: "Team Fortress 2",
  developer: "Valve",
  price: 0,
  stock: 99,
  cover_image: null,
  genres: ["First Person Shooter", "Action"],
});

export const hades = new Game({
  title: "Hades",
  developer: "Supergiant Games",
  price: 25,
  stock: 99,
  cover_image: null,
  genres: ["Roguelike", "Action", "RPG"],
});

export const deadCells = new Game({
  title: "Dead Cells",
  developer: "Motion Twin",
  price: 25,
  stock: 99,
  cover_image: null,
  genres: ["Roguelike", "Action", "Platformer"],
});

export const enterTheGungeon = new Game({
  title: "Enter the Gungeon",
  developer: "Dodge Roll",
  price: 15,
  stock: 99,
  cover_image: null,
  genres: ["Roguelike", "Action"],
});

export const apexLegends = new Game({
  title: "Apex Legends",
  developer: "Respawn Entertainment",
  price: 0,
  stock: 99,
  cover_image: null,
  genres: ["First Person Shooter", "Action", "Third Person Shooter"],
});
