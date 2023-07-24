const express = require('express');
const { Post } = require('../model');
const router = express.Router();

router.post('/api/post/add', async (req, res) => {
  const { content, select } = req.body;

  try {
    const newPost = new Post({
      author: req.user.id,
      category: select,
      content,
      slug: content.slice(0, 50).normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9 ]/g, '')
        .replace(/\s+/g, "-")
    });

    await newPost.save();

    res.redirect('/dashboard');
  } catch (error) {
    res.redirect('/dashboard');
  }
});

module.exports = router;