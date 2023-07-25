const { User, Post, Category } = require("../model/index");

async function add(req, res) {
  const { name } = req.body;

  try {
    const newCategory = new Category({
      name,
    });

    await newCategory.save();

    res.redirect("/admin/category");
  } catch (error) {
    res.redirect("/admin/category");
  }
}

async function openEdit(req, res) {
  Category.findById(req.params.id).then(function (category, err) {
    if (err) {
      res.send(err);
    } else {
      res.render("admin/category/edt", { category, message: "" });
    }
  });
}

function edit(req, res) {
  Category.findById(req.params.id).then(async function (category, err) {
    if (err) {
      res.send(err);
    } else {
      category.name = req.body.name;

      category.save().then(function (post, err) {
        if (err) {
          res.send(err);
        } else {
          res.redirect("/admin/category");
        }
      });
    }
  });
}

function list(req, res) {
  Category.find({}).then(function (categories, err) {
    if (err) {
      res.send(err);
    } else {
      res.render("admin/category/index", { categories });
    }
  });
}

function filter(req, res) {
  Category.find({
    name: new RegExp(req.body.search.split(" ").join(".*"), "ig"),
  }).then(function (categories, err) {
    if (err) {
      res.send(err);
    } else {
      res.render("admin/category/index", { categories });
    }
  });
}

function del(req, res) {
  Category.findByIdAndDelete(req.params.id).then(function (post, err) {
    if (err) {
      res.send(err);
    } else {
      res.redirect("/admin/category");
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
