const express = require("express");
const routes = express.Router();
const controller = require("../controller/controller.js");

routes.use(express.json());
routes.use(express.urlencoded({ extended: true }));

routes.get("/", controller.list);
routes.post("/", controller.filter);

routes.get("/post/new", controller.newPost);
routes.post("/post/new", controller.create);

routes.delete("/post/del/:id", controller.deletePost);

routes.get("/post/edit/:id", controller.editPost);
routes.post("/post/edit/:id", controller.edit);

routes.get("/post/:slug", controller.post);

module.exports = routes;
