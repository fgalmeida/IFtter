const express = require("express");
const { User, Category, Post } = require("../model");
const passport = require("../config/passport");
const bcrypt = require("bcrypt");
const router = express.Router();
const moment = require("moment");
moment.locale("pt-BR");

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/auth/login");
  }
}

router.get("/dashboard", isAuthenticated, async (req, res) => {
  const categories = await Category.find({}).lean();
  const posts = await Post.find({})
    .sort({ created_at: -1 })
    .populate("author")
    .populate("category")
    .lean();

  res.render("dashboard/dashboard", {
    user: req.user,
    categories,
    posts,
    moment,
  });
});

router.get("/dashboard/profile/:id", isAuthenticated, async (req, res) => {
  const profileUser = await User.findById(req.params.id).lean();
  const posts = await Post.find({ author: profileUser })
    .sort({ created_at: -1 })
    .populate("author")
    .populate("category")
    .lean();

  const profile = {
    ...profileUser,
    posts,
  };

  res.render("dashboard/profile", {
    user: req.user,
    profile,
    moment,
  });
});

router.get("/dashboard/post/edit/:id", isAuthenticated, async (req, res) => {
  const categories = await Category.find({}).lean();
  const post = await Post.findById(req.params.id)
    .sort({ created_at: -1 })
    .populate("author")
    .populate("category")
    .lean();

  if (req.user.id == post.author._id) {
    res.render("dashboard/post/edit", {
      user: req.user,
      categories,
      post
    });
  } else {
    res.redirect('/dashboard')
  }

});

module.exports = router;
