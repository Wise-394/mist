<div align="center">

# 🌫️ Mist
**A fully functional game inventory management app where you can browse, add, edit, and delete games. complete with pricing and stock, built with a classic MVC backend stack.**

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![EJS](https://img.shields.io/badge/EJS-B4CA65?style=for-the-badge&logo=ejs&logoColor=black)](https://ejs.co/)

</div>

---

## ✨ Features

- **Game Catalog** — Browse a collection of games with their title, price, and available stock
- **Full CRUD** — Create, read, update, and delete games directly from the UI
- **Input Validation** — Form inputs are validated server-side using `express-validator`
- **MVC Architecture** — Clean separation of concerns with Models, Views, and Controllers
- **Database Seeding** — Tables and initial data are created and populated via JS scripts
- **Middleware Support** — Custom middlewares handle validation and error management

---

## 🖼️ Preview

**Preview**

<div align="center">

<img width="800" alt="Mist preview 1" src="https://github.com/user-attachments/assets/3e0ebe5a-987d-462a-8236-a529a77354e2" />
<img width="800" alt="Mist preview 2" src="https://github.com/user-attachments/assets/b3cbc27d-564c-4920-92fb-c81e1013d3de" />
<img width="400" alt="Mist preview 3" src="https://github.com/user-attachments/assets/08a12a77-4f96-40e1-b001-f6f44e5eb467" />

</div>
---

## 🛠️ Built With

- [Node.js](https://nodejs.org/) — JavaScript runtime environment
- [Express.js](https://expressjs.com/) — Web framework for handling routes and middleware
- [EJS](https://ejs.co/) — Templating engine for server-rendered views
- [PostgreSQL](https://www.postgresql.org/) — Relational database for storing game inventory
- [express-validator](https://express-validator.github.io/) — Server-side input validation

---

## 🚀 Getting Started

### Prerequisites
- Node.js
- PostgreSQL

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/mist.git
cd mist

# Install dependencies
npm install

# Set up your .env file
DB_URL=your_postgresql_connection_string

# Start the development server
npm run dev
```

---

## ⚠️ Disclaimer
> **Note:** The database seed script populates games with titles, prices, and stock data only. Game images are **not** included in the auto-population. As a result, game images will not appear for seeded entries. This is intentional to save resources, images were omitted from the seed data since the original purpose of auto-seeding was for deployment. However, as this is only a learning project, the decision to deploy was reconsidered due to cost. You can still manually add image by editing each game through the UI after seeding.

This is a personal learning project built as part of [The Odin Project](https://www.theodinproject.com/) curriculum.
It is intended for educational and portfolio purposes only. The design and concept are inspired by [Steam](https://store.steampowered.com/) 
and is not affiliated with or endorsed by Valve Corporation.
