const express = require('express');
const { User } = require('../model');
const router = express.Router();

router.get('/admin/user', (req, res) => {
  res.render('admin/users/index', { users: [] });
});

router.get('/admin/user/add', (req, res) => {
  res.render('admin/users/add', { users: [] });
});

router.get('/admin/user/edit/:id', (req, res) => {
  res.render('admin/users/edt', { users: [] });
});

module.exports = router;
