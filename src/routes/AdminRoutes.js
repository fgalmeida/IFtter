const express = require("express");
const routes = express.Router();
const userController = require("../controller/userController");

// Views

routes.get("/admin/users", controller.list);
routes.get("/admin/users/edit/:id", controller.openEdit);

// Back

routes.post("/admin/users", controller.filter);
routes.post("/admin/users/edit/:id", upload.single("avatar"), controller.edit);
routes.get("/admin/users/del/:id", controller.del);
