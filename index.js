import express from "express";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 3000;

/* =========================
   MIDDLEWARE
========================= */

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

/* =========================
   DATABASE CONNECTION
========================= */

const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

db.connect()
  .then(() => console.log("✅ Connected to PostgreSQL"))
  .catch(err => console.log("❌ DB Connection Error:", err));


/* =========================
   HOME ROUTE (READ + SORT)
========================= */

app.get("/", async (req, res) => {
  try {
    const sort = req.query.sort || "recency";

    let orderBy;

    // Whitelist allowed sorting (prevents SQL injection)
    if (sort === "rating") {
      orderBy = "rating DESC";
    } else if (sort === "title") {
      orderBy = "title ASC";
    } else {
      orderBy = "created_at DESC";
    }

    const result = await db.query(
      `SELECT * FROM books ORDER BY ${orderBy}`
    );

    res.render("index.ejs", {
      books: result.rows,
      currentSort: sort
    });

  } catch (err) {
    console.log(err);
    res.send("Error fetching books");
  }
});


/* =========================
   SHOW ADD FORM
========================= */

app.get("/add", (req, res) => {
  res.render("add.ejs");
});


/* =========================
   CREATE BOOK
========================= */

app.post("/add", async (req, res) => {
  try {
    const { title, author, rating, notes, isbn, date_read } = req.body;

    // Clean ISBN (remove hyphens/spaces)
    const cleanIsbn = isbn ? isbn.replace(/-/g, "").trim() : null;

    // Handle empty date
    const formattedDate = date_read === "" ? null : date_read;

    await db.query(
      `INSERT INTO books
       (title, author, rating, notes, isbn, date_read)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [title, author || null, rating || null, notes || null, cleanIsbn, formattedDate]
    );

    res.redirect("/");

  } catch (err) {
    console.log(err);
    res.send("Error adding book");
  }
});


/* =========================
   SHOW EDIT FORM
========================= */

app.get("/edit/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const result = await db.query(
      "SELECT * FROM books WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.send("Book not found");
    }

    res.render("edit.ejs", {
      book: result.rows[0]
    });

  } catch (err) {
    console.log(err);
    res.send("Error loading edit page");
  }
});


/* =========================
   UPDATE BOOK
========================= */

app.post("/edit/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { title, author, rating, notes, isbn, date_read } = req.body;

    const cleanIsbn = isbn ? isbn.replace(/-/g, "").trim() : null;
    const formattedDate = date_read === "" ? null : date_read;

    await db.query(
      `UPDATE books 
       SET title = $1,
           author = $2,
           rating = $3,
           notes = $4,
           isbn = $5,
           date_read = $6
       WHERE id = $7`,
      [
        title,
        author || null,
        rating || null,
        notes || null,
        cleanIsbn,
        formattedDate,
        id
      ]
    );

    res.redirect("/");

  } catch (err) {
    console.log(err);
    res.send("Error updating book");
  }
});


/* =========================
   DELETE BOOK
========================= */

app.post("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;

    await db.query(
      "DELETE FROM books WHERE id = $1",
      [id]
    );

    res.redirect("/");

  } catch (err) {
    console.log(err);
    res.send("Error deleting book");
  }
});


/* =========================
   START SERVER
========================= */

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});