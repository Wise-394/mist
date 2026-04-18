export class Game {
  constructor({
    id = null,
    title,
    developer,
    price,
    stock,
    cover_image,
    genres,
  }) {
    this.id = id;
    this.title = title;
    this.developer = developer;
    this.price = price;
    this.stock = stock;
    this.cover_image = cover_image;
    this.genres = genres;
  }
}
