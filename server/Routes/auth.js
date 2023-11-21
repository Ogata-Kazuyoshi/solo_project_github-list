const router = require('express').Router();
const knex = require('../knexIndex');
const authController = require('../controllers/authController');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const userInfo = [
  {
    id: 1,
    user_name: 'ogata',
    salt: 'a1b92z7',
    hased_password: '41daafda9a68bcbbe970606097cc1c3155603210cadd4a0799527c1c3',
  },
  {
    id: 2,
    user_name: 'kazuyoshi',
    salt: 'Ulztl2',
    hased_password: '397f02aa1c5375e3b1f4b5863c624ae369ead8e2f7af53ee3fc7af925',
  },
];
// const getAlldata = () =>{

// }
passport.use(
  new LocalStrategy((username, password, done) => {
    const user = userInfo.find(
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
  const user = userInfo.find((u) => u.id === id);
  done(null, user);
});

// router.post('/login', authController.authentification);

router.post('/login', passport.authenticate('local'), (req, res) => {
  res.json({ message: 'Login successful' });
});

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
  console.log('AuthCheck');
  if (req.isAuthenticated()) {
    console.log('accepted!! server');
    res.json({ authenticated: true, user: req.user });
  } else {
    console.log('rejected server!');
    res.json({ authenticated: false });
  }
});

module.exports = router;
