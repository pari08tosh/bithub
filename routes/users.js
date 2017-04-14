//jshint esversion:6, node: true

"use strict";

const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../config/database');

// Register
router.post('/register', (req, res, next) => {
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });

  User.getUserByUsername(newUser.username, (err, data) => {
    if(!data) {
      User.addUser(newUser, (err, user) => {
        if(err){
          res.json({success: false, msg: 'Something went wrong :(. Please try again'});
        } else {
          res.json({success: true, msg:'Successfully Registered :)'});
        }
      });
    } else {
      res.json({success: false, msg:'Username Already Taken'});
    }
  });
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.json({
        success: false,
        msg: 'Invalid Username',
      });
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        let token = jwt.sign(user, config.secret, {
          expiresIn: 608400,
        });

        res.json({
          success: true,
          token: 'JWT ' + token,
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
          }
        });
      } else {
        res.json({
          success: false,
          msg: 'Invalid Password',
        });
      }
    });
  });
});

// Profile
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  res.json(req.user);
});

module.exports = router;
