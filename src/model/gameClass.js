export class Game {
  constructor({ title, developer, price, stock, cover_image, genres }) {
    this.title = title;
    this.developer = developer;
    this.price = price;
    this.stock = stock;
    this.cover_image = cover_image;
    this.genres = genres;
  }
}
