//jshint esversion:6, node: true

"use strict";

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
const blogs = require('./routes/blogs');
const users = require('./routes/users');
const comments = require('./routes/comments');

// Connect To Database
mongoose.connect(config.database);

// On Connection
mongoose.connection.on('connected', () => {
  console.log('Connected to database '+config.database);
});

// On Error
mongoose.connection.on('error', (err) => {
  console.log('Database error: '+err);
});

const app = express();

// Port Number
const port = 3000;

// CORS Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

// Routes
app.use('/users', users);
app.use('/blogs', blogs);
app.use('/comments', comments);

// Index Route
app.get('/', (req, res) => {
  res.send('Server is down');
});

app.get('*', (req, res, next) => {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

// Start Server
app.listen(port, () => {
  console.log('Server started on port '+port);
});
