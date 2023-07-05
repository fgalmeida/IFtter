const Post = require("../model/Post");
const moment = require("moment");

function newPost(req, res) {
  res.render("new");
}

function post(req, res) {
  Post.find({ slug: String(req.params.slug) }).then(function (post, err) {
    if (err) {
      res.send(err);
    } else {
      res.render("post", { post: post[0], moment });
    }
  });
}

function list(req, res) {
  Post.find({})
    .sort({ created_at: "desc" })
    .then(function (posts, err) {
      if (err) {
        res.send(err);
      } else {
        res.render("index", { posts, moment });
      }
    });
}

function filter(req, res) {
  Post.find({
    title: new RegExp(String(req.body.search).split(" ").join("."), "ig"),
  })
    .sort({ created_at: "desc" })
    .then(function (posts, err) {
      if (err) {
        res.send(err);
      } else {
        res.render("index", { posts, moment });
      }
    });
}

function create(req, res) {
  let post = new Post({
    slug: req.body.title
      .toLowerCase()
      .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "")
      .replaceAll(" ", "-"),
    title: req.body.title,
    description: req.body.description,
    content: req.body.content,
    author: req.body.author,
  });

  post.save().then(function (post, err) {
    if (err) {
      res.send(err);
    } else {
      res.redirect("/");
    }
  });
}

function edit(req, res) {
  const id = req.params.id;

  let post = {
    slug: req.body.title
      .toLowerCase()
      .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "")
      .replaceAll(" ", "-"),
    title: req.body.title,
    description: req.body.description,
    content: req.body.content,
    author: req.body.author,
  };

  Post.findByIdAndUpdate({ _id: id }, post).then(function (post, err) {
    if (err) {
      res.send(err);
    } else {
      res.redirect("/");
    }
  });
}

function deletePost(req, res) {
  Post.deleteOne({ _id: req.params.id }).then(function (err) {
    if (err) {
      res.send(err);
    } else {
      res.status(200);
    }
  });
}

function editPost(req, res) {
  Post.findById(req.params.id).then(function (post, err) {
    if (err) {
      res.send(err);
    } else {
      res.render("edit", { post: post, moment });
    }
  });
}

module.exports = {
  newPost,
  post,
  list,
  filter,
  create,
  edit,
  deletePost,
  editPost,
};
