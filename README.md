# 📚 Book Review App

A full-stack web application for managing personal book reviews with dynamic cover integration. This project demonstrates backend architecture, database design, RESTful routing, API integration, and modern UI styling.

---

## 🚀 Features

- Full CRUD functionality (Create, Read, Update, Delete)
- PostgreSQL database persistence
- Express.js backend with RESTful routing
- EJS server-side rendering
- Dynamic book cover rendering using Open Library Covers API
- Sorting by recency, rating, and title
- Secure parameterized SQL queries
- Modern responsive UI with premium styling
- Clean and scalable project structure

---

## 🛠 Tech Stack

### Backend
- Node.js
- Express.js
- PostgreSQL
- pg (Node PostgreSQL driver)

### Frontend
- EJS
- Modern CSS (Glassmorphism UI Design)
- Google Fonts (Inter)

### Other Tools
- Axios
- dotenv
- Nodemon

---

## 📂 Project Structure

book-review-platform/
│
├── index.js
├── package.json
├── .env (not included in repo)
│
├── views/
│   ├── index.ejs
│   ├── add.ejs
│   └── edit.ejs
│
├── public/
│   └── styles.css
│
└── README.md

---

## 🗄 Database Schema

CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255),
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    notes TEXT,
    isbn VARCHAR(20),
    date_read DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

git clone https://github.com/prathamxagarwal/book-review-platform.git
cd book-review-platform

---

### 2️⃣ Install Dependencies

npm install

---

### 3️⃣ Create PostgreSQL Database

CREATE DATABASE book_reviews;

Run the schema provided above inside the database.

---

### 4️⃣ Create .env File

Create a .env file in the root directory:

DB_USER=your_db_user  
DB_HOST=localhost  
DB_NAME=book_reviews  
DB_PASSWORD=your_password  
DB_PORT=5432  

---

### 5️⃣ Start the Server

node index.js

Or with nodemon:

npx nodemon index.js

---

### 6️⃣ Open in Browser

http://localhost:3000

---

## 🌐 API Integration

Book covers are dynamically rendered using the Open Library Covers API:

https://covers.openlibrary.org/b/isbn/{ISBN}-L.jpg

ISBN values are sanitized before being stored to ensure valid API requests.

---

## 🔐 Security Practices

- Parameterized SQL queries (prevents SQL injection)
- Environment variables for database credentials
- .env excluded using .gitignore
- Controlled query-based sorting (whitelisted values)

---

## 📌 Key Learning Outcomes

- Backend routing and middleware handling
- PostgreSQL schema design and constraints
- RESTful architecture principles
- Server-side rendering using EJS
- External API integration
- Clean UI/UX design consistency
- Deployment-ready application structure

---

## 👤 Author

Your Name  
GitHub: https://github.com/prathamxagarwal 

---

## 📄 License

This project is open-source and available under the MIT License.
