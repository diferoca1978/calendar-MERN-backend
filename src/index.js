// import express from "express";
const express = require('express');
const cors = require('cors');
const dbConnection = require('./database/config');
require('dotenv').config();

// Raise the server
const app = express();

// DB connection
dbConnection();

// Cors
app.use(cors());

// Public directory
app.use(express.static('public'));

// Read & Parse of the body
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));

app.use('/api/events', require('./routes/events'));

// Listening requests
app.listen(process.env.PORT, () => {
  console.log(`App running on ${process.env.PORT} port`);
});
