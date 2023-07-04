const express = require("express");
const routes = express.Router();
const postController = require("../controller/postController");
const multer = require("multer");
const upload = multer({ dest: "public/images" });
//criar rotas aqui

// routes.get("/post/add", controller.abreadd);
routes.post("/post/add", upload.single("thumb"), postController.add);

// routes.get("/post/lst", controller.listar);
// routes.post("/post/lst", controller.filtrar);

// routes.get("/post/edt/:id", controller.abreedt);
// routes.post("/post/edt/:id", upload.single("thumb"), controller.edt);

// routes.get("/post/del/:id", controller.del);

module.exports = routes;
