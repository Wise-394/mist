export class Game {
  constructor({
    id = null,
    title,
    developer,
    price,
    stock,
    cover_image,
    cover_image_type = null,
    genres,
  }) {
    this.id = id;
    this.title = title;
    this.developer = developer;
    this.price = price;
    this.stock = stock;
    this.cover_image = cover_image;
    this.cover_image_type = cover_image_type;
    this.genres = genres;
  }
}
