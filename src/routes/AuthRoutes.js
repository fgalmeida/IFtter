const express = require('express');
const { User } = require('../model');
const passport = require('../config/passport');
const bcrypt = require('bcrypt');
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "public/avatars" });

router.get('/logout', (req, res) => {
  req.logout((done) => {
    res.redirect('/');
  });
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/auth/login',
}));

router.get('/register', (req, res) => {
  res.render('register', { message: "" });
});

router.post('/register', upload.single("avatar"), async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.render('register', { message: 'Este email já está em uso.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      avatar: req.file.filename,
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.redirect('/auth/login');
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    res.render('register', { message: 'Erro ao registrar usuário.' });
  }
});

module.exports = router;
