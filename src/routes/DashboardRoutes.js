const express = require('express');
const { User, Category, Post } = require('../model');
const passport = require('../config/passport');
const bcrypt = require('bcrypt');
const router = express.Router();

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/auth/login');
  }
}

router.get('/dashboard', isAuthenticated, async (req, res) => {
  const categories = await Category.find({}).lean();
  const posts = await Post.find({}).populate('author').populate('category').lean();

  res.render('dashboard', { user: req.user, categories, posts });
});

module.exports = router;
