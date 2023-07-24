const { User, Post } = require("../model/index");
const crypt = require("bcrypt");

function getRegister(req, res) {
  res.render('/register.ejs');
}

function getLogin(req, res) {
  res.render('/login.ejs');
}

function openEdit(req, res) {
  User.findById(req.params.id).then(function (user, err) {
    if (err) {
      res.send(err);
    } else {
      res.render("admin/user/edit", { User: user });
    }
  });
}

async function login(req, res) {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email }).lean();
  const pass = await crypt.compare(password, user.password);

  if (pass == true) {
    const posts = await Post.findById({}).lean();
    res.render("dashboard", { user: user, posts: posts });
  } else {
    res.send("404");
  }
}

async function register(req, res) {
  const pass = await crypt.hash(req.body.password, 10);

  let user = new User({
    avatar: req.file.avatar,
    username: req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: pass.toString(),
  });

  user.save().then(function (user, err) {
    if (err) {
      res.send(err);
    } else {
      res.redirect("/auth/login");
    }
  });
}

function edit(req, res) {
  User.findById(req.params.id).then(function (user, err) {
    if (err) {
      res.send(err);
    } else {
      const pass = CryptoJS.AES.encrypt(req.body.password, secret);

      user.avatar = req.file.avatar;
      user.username = req.body.username;
      user.firstName = req.body.firstName;
      user.lastName = req.body.lastName;
      user.email = req.body.email;
      user.password = pass.toString();
      user.save().then(function (user, err) {
        if (err) {
          res.send(err);
        } else {
          res.redirect("/admin/user");
        }
      });
    }
  });
}

function list(req, res) {
  User.find({}).then(function (users, err) {
    if (err) {
      res.send(err);
    } else {
      res.render("admin/user/", { Users: users });
    }
  });
}

function filter(req, res) {
  User.find({ nome: new RegExp(req.body.pesquisar.split(" ").join(".*"), "ig") }).then(function (users, err) {
    if (err) {
      res.send(err);
    } else {
      res.render("admin/user/", { Users: users });
    }
  });
}

function del(req, res) {
  User.findByIdAndDelete(req.params.id).then(function (user, err) {
    if (err) {
      res.send(err);
    } else {
      res.redirect("/admin/user/");
    }
  });
}

module.exports = {
  register,
  login,
  edit,
  list,
  filter,
  del,
  openEdit,
  getRegister,
  getLogin,
};
