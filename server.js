const express = require("express");
const app = express();

require("dotenv").config();

const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect((err) => {
  if (err) {
    console.error("Database Connection Error:", err);
    return;
  }
  console.log(" Database Connected!");
});
// Question 1 goes here

app.get("/patients", (req, res) => {
  const query =
    "SELECT patient_id, first_name, last_name, date_of_birth FROM patients";

  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error retrieving patients:", err);
      res.status(500).send("Error retrieving patients");
    } else {
      res.json(results);
    }
  });
});

// Question 2 goes here
app.get("/providers", (req, res) => {
  const query =
    "SELECT first_name, last_name, provider_specialty FROM providers";

  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error retrieving providers:", err);
      res.status(500).send("Error retrieving providers");
    } else {
      res.json(results);
    }
  });
});

// Question 3 goes here
app.get("/patients/:filter", (req, res) => {
  const firstName = req.params.first_name;

  const query =
    "SELECT patient_id, first_name, last_name, date_of_birth FROM patients WHERE first_name = ?";

  connection.query(query, [firstName], (err, results) => {
    if (err) {
      console.error("Error filtering patients:", err);
      res.status(500).send("Error filtering patients");
    } else {
      res.json(results);
    }
  });
});

// Question 4 goes here
app.get("/providers/:filter", (req, res) => {
  const specialty = req.params.filter;

  const query =
    "SELECT first_name, last_name, provider_specialty FROM providers WHERE provider_specialty = ?";

  connection.query(query, [specialty], (err, results) => {
    if (err) {
      console.error("Error retrieving providers by specialty:", err);
      res.status(500).send("Error retrieving providers by specialty");
    } else {
      res.json(results);
    }
  });
});

// listen to the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server is runnig on http://localhost:${PORT}`);
});
