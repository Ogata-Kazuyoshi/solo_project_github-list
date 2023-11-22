const router = require('express').Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const authController = require('../controllers/authController');

const users = [
  { id: 1, username: 'user1', password: '1234' },
  { id: 2, username: 'user2', password: 'abcd' },
  // 他のユーザー情報も同様に追加
  //本当はサーバーでソルト＆ハッシュ化必要。passportの設定がうまくできず断念a
];

// Passportの設定
passport.use(
  new LocalStrategy((username, password, done) => {
    const user = users.find(
      (u) => u.username === username && u.password === password
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
  authController.getAllUser,
  passport.authenticate('local'),
  (req, res) => {
    console.log('users : ', res.locals.users);
    res.json({ message: 'Login successful' });
  }
);
// router.post('/login', passport.authenticate('local'), (req, res) => {
//   console.log('OKKKK');
//   res.end();
// });

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
  //   console.log('AuthCheck');
  if (req.isAuthenticated()) {
    // console.log('accepted!! server');
    res.json({ authenticated: true, user: req.user });
  } else {
    // console.log('rejected server!');
    res.json({ authenticated: false });
  }
});

module.exports = router;
