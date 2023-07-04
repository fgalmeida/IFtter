const express = require("express");
const routes = express.Router();
const userController = require("../controller/userController");
const multer = require("multer");
const upload = multer({ dest: "public/avatars" });

// Views

routes.get("/", (req, res) => {
  res.render("login");
});

routes.get("/register", (req, res) => {
  res.render("register");
});

// Back

routes.post("/login", userController.login);
routes.post("/register", upload.single("avatar"), userController.register);

module.exports = routes;
