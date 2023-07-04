const Post = require("../model/Post");

function create(req, res) {
  // Criando um novo objeto Date
  let post = new Post({
    titulo: req.body.titulo,
    texto: req.body.texto,
    foto: req.file.filename,
  });

  post.save().then(function (post, err) {
    if (err) {
      res.send(err);
    } else {
      res.redirect("/post/add");
    }
  });
}

function list(req, res) {
  Post.find({}).then(function (posts, err) {
    if (err) {
      res.send(err);
    } else {
      res.render("post/lst", {
        Posts: posts,
      });
    }
  });
}

function filter(req, res) {
  Post.find({
    titulo: new RegExp(req.body.pesquisar.split(" ").join(".*"), "ig"),
  }).then(function (posts, err) {
    if (err) {
      res.send(err);
    } else {
      res.render("post/lst", {
        Posts: posts,
      });
    }
  });
}

function del(req, res) {
  Post.findByIdAndDelete(req.params.id).then(function (post, err) {
    if (err) {
      res.send(err);
    } else {
      res.redirect("/post/lst");
    }
  });
}

function openEdit(req, res) {
  Post.findById(req.params.id).then(function (post, err) {
    if (err) {
      res.send(err);
    } else {
      res.render("post/edt", {
        Post: post,
      });
    }
  });
}

function edit(req, res) {
  Post.findById(req.params.id).then(function (post, err) {
    if (err) {
      res.send(err);
    } else {
      (post.titulo = req.body.titulo),
        (post.texto = req.body.texto),
        (post.foto = req.file.filename),
        post.save().then(function (post, err) {
          if (err) {
            res.send(err);
          } else {
            res.redirect("/post/lst");
          }
        });
    }
  });
}

module.exports = {
  create,
  list,
  filter,
  openEdit,
  edit,
  del,
};
