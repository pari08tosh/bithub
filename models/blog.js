// jshint esversion: 6, node: true

"use strict";

const mongoose = require('mongoose');
const config = require('../config/database');

const BlogSchema = mongoose.Schema({
  heading: {
    type: String,
    required: true,
  },
  tags: [],
  username: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  modifiedDate: {
    type: Date,
    default: Date.now,
  },
});

const Blog = module.exports = mongoose.model('Blog', BlogSchema);

module.exports.countBlogs = function(tag, callback) {
  if (tag === null) {
    Blog.find().count(callback);
    } else {
      Blog.find({ tags: tag }).count(callback);
    }
};

module.exports.getBlogs = function(pn, tag, callback) {
  if (tag === null) {
    Blog.
      find().
      sort('-modifiedDate').
      select('heading username tags modifiedDate').
      skip(pn*10).
      limit(10).
      exec(callback);
    } else {
      Blog.
        find({ tags: tag }).
        sort('-modifiedDate').
        select('heading username tags modifiedDate').
        skip(pn*10).
        limit(10).
        exec(callback);
    }
};

module.exports.getBlogById = function(id, callback) {
  Blog.findById(id, callback);
};

module.exports.insertBlog = function(newBlog, callback) {
  newBlog.save(callback);
};

module.exports.getBlogByUsername = function(username, callback) {
  const query = { username: username };
  Blog.find(query).sort('-modifiedDate').exec(callback);
};
