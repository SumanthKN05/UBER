const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const connectToDb = require('./DB/db.js');
const userRoutes = require('./routes/user.routes');
const cookieParser= require('cookie-parser');

// Connect to MongoDB
connectToDb();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use('/users', userRoutes);

module.exports = app;
