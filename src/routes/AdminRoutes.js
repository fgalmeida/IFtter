const express = require('express');
const { User, Category } = require('../model');
const userController = require("../controller/userController")
const postController = require("../controller/postController")
const categoryController = require("../controller/categoryController")
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "public/avatars" });

// USER

router.get('/admin/user', userController.list);

router.post('/admin/user', userController.filter);

router.get('/admin/user/add', (req, res) => {
  res.render('admin/users/add', { message: "" });
});

router.post('/admin/user/add', upload.single("avatar"), userController.add
);

router.get('/admin/user/edit/:id', userController.openEdit);

router.post('/admin/user/edit/:id', upload.single("avatar"), userController.edit);

router.post('/admin/user/del/:id', userController.del);

// POST

router.get('/admin/post', postController.list);

router.post('/admin/post', postController.filter);

router.get('/admin/post/add', async (req, res) => {
  const categories = await Category.find({}).lean();
  const users = await User.find({}).lean();
  res.render('admin/post/add', { users, categories, message: "" });
});

router.post('/admin/post/add', postController.add);

router.get('/admin/post/edit/:id', postController.openEdit);

router.post('/admin/post/edit/:id', postController.edit);

router.post('/admin/post/del/:id', postController.del);

// CATEGORY

router.get('/admin/category', categoryController.list);

router.post('/admin/category', categoryController.filter);

router.get('/admin/category/add', async (req, res) => {
  res.render('admin/category/add', { message: "" });
});

router.post('/admin/category/add', categoryController.add);

router.get('/admin/category/edit/:id', categoryController.openEdit);

router.post('/admin/category/edit/:id', categoryController.edit);

router.post('/admin/category/del/:id', categoryController.del);

module.exports = router;
