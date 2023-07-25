const express = require("express");
const { Post } = require("../model");
const router = express.Router();

router.post("/api/post/add", async (req, res) => {
  const { content, select } = req.body;

  try {
    const newPost = new Post({
      author: req.user.id,
      category: select,
      content,
      slug: content
        .slice(0, 50)
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9 ]/g, "")
        .replace(/\s+/g, "-"),
    });

    await newPost.save();

    res.redirect("/dashboard");
  } catch (error) {
    res.redirect("/dashboard");
  }
});

router.post("/api/post/edit/:id", async (req, res) => {
  const { content, select } = req.body;

  Post.findById(req.params.id).then(function (post, err) {
    if (err) {
      res.send(err);
    } else {
      post.author = req.user.id,
        post.category = select,
        post.content = content,
        post.slug = content
          .slice(0, 50)
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9 ]/g, "")
          .replace(/\s+/g, "-"),
        post.save().then(function (user, err) {
          if (err) {
            res.send(err);
          } else {
            res.redirect("/dashboard");
          }
        });
    }
  });
});

router.post("/api/post/del/:id", async (req, res) => {
  const post = await Post.findOne({
    _id: req.params.id,
    author: {
      _id: req.user.id
    },
  })
    .populate("author")
    .lean();

  if (req.user.id == post.author._id) {
    await Post.findByIdAndDelete(req.params.id).then(function (post, err) {
      if (err) {
        res.send(err);
      } else {
        res.redirect("/dashboard");
      }
    });
  }
});

module.exports = router;
