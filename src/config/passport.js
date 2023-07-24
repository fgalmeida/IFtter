const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { User } = require('../model');
const mongoose = require('./connection');
const bcrypt = require("bcrypt");

passport.use(
  new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });

        if (!user) {
          return done(null, false, { message: 'Email não encontrado.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'Senha incorreta.' });
        }
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, {
    id: user._id,
    avatar: user.avatar,
    username: user.username,
    email: user.email
  });
});

passport.deserializeUser((user, cb) => {
  process.nextTick(function () {
    return cb(null, user);
  });
});

module.exports = passport;