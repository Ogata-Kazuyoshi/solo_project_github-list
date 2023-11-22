const router = require('express').Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const authController = require('../controllers/authController');
const knex = require('../knexIndex');

let users = [];

const getAllUser = async (req, res, next) => {
  try {
    const tempUsers = await knex
      .select('*')
      .from('user_authentification')
      .orderBy('id');

    users = tempUsers;
    next();
  } catch (err) {
    console.log(`err : ${err}`);
  }
};

// Passportの設定
passport.use(
  new LocalStrategy((username, password, done) => {
    const user = users.find(
      (u) =>
        u.user_name === username &&
        u.hased_password === authController.enhash(`${u.salt}${password}`)
    );
    if (user) {
      return done(null, user);
    } else {
      return done(null, false, { message: 'Incorrect username or password.' });
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const user = users.find((u) => u.id === id);
  done(null, user);
});

router.post(
  '/login',
  getAllUser,
  passport.authenticate('local'),
  (req, res) => {
    res.json({ message: 'Login successful' });
  }
);

// ログアウトエンドポイント
router.get('/logout', (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.json({ message: 'Logout successful' });
  });
  res;
});

// 認証されているかどうかを確認するエンドポイント
router.get('/checkAuth', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ authenticated: true, user: req.user });
  } else {
    res.json({ authenticated: false });
  }
});

module.exports = router;
