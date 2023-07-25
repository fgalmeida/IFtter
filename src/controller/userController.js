const { User } = require("../model/index");
const bcrypt = require('bcrypt');

async function add(req, res) {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.render('admin/users/add', { message: 'Este email já está em uso.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      avatar: req.file.filename,
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.redirect('/admin/user');
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    res.render('admin/users/add', { message: 'Erro ao registrar usuário.' });
  }
}

function openEdit(req, res) {
  User.findById(req.params.id).then(function (user, err) {
    if (err) {
      res.send(err);
    } else {
      res.render('admin/users/edt', { user, message: "" });
    }
  });
}

function edit(req, res) {
  User.findById(req.params.id).then(async function (user, err) {
    if (err) {
      res.send(err);
    } else {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      user.avatar = req.file.filename;
      user.username = req.body.username;
      user.email = req.body.email;
      user.password = hashedPassword;

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
      res.render('admin/users/index', { users: users });
    }
  });
}

function filter(req, res) {
  User.find({ username: new RegExp(req.body.search.split(" ").join(".*"), "ig") }).then(function (users, err) {
    if (err) {
      res.send(err);
    } else {
      res.render('admin/users/index', { users: users });
    }
  });
}

function del(req, res) {
  User.findByIdAndDelete(req.params.id).then(function (user, err) {
    if (err) {
      res.send(err);
    } else {
      res.redirect("/admin/user");
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
