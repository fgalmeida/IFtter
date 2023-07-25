const { User, Post, Category } = require("../model/index");

async function add(req, res) {
  const { content, select, author } = req.body;

  try {
    const newPost = new Post({
      author: author,
      category: select,
      content,
      slug: content
        .slice(0, 50)
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9 ]/g, "")
        .replace(/\s+/g, "-"),
    });

    await newPost.save();

    res.redirect("/admin/post");
  } catch (error) {
    res.redirect("/admin/post");
  }
}

async function openEdit(req, res) {
  const categories = await Category.find({}).lean();

  Post.findById(req.params.id).populate("author")
    .populate("category").then(function (post, err) {
      if (err) {
        res.send(err);
      } else {
        res.render('admin/post/edt', { post, categories, message: "" });
      }
    });
}

function edit(req, res) {
  Post.findById(req.params.id).then(async function (post, err) {
    if (err) {
      res.send(err);
    } else {
      post.content = req.body.content;
      post.category = req.body.select;
      post.slug = req.body.content
        .slice(0, 50)
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9 ]/g, "")
        .replace(/\s+/g, "-"),

        post.save().then(function (post, err) {
          if (err) {
            res.send(err);
          } else {
            res.redirect("/admin/post");
          }
        });
    }
  });
}

function list(req, res) {
  Post.find({}).populate("author")
    .populate("category").then(function (posts, err) {
      if (err) {
        res.send(err);
      } else {
        res.render('admin/post/index', { posts });
      }
    });
}

function filter(req, res) {
  Post.find({ slug: new RegExp(req.body.search.split(" ").join(".*"), "ig") }).then(function (posts, err) {
    if (err) {
      res.send(err);
    } else {
      res.render('admin/post/index', { posts });
    }
  });
}

function del(req, res) {
  Post.findByIdAndDelete(req.params.id).then(function (post, err) {
    if (err) {
      res.send(err);
    } else {
      res.redirect("/admin/post");
    }
  });
}

module.exports = {
  add,
  openEdit,
  edit,
  list,
  filter,
  del,
};
