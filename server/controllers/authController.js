const crypto = require('crypto');
const knex = require('../knexIndex');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const enhash = (str) => {
  const hash = crypto.createHash('sha256');
  return hash.update(str).digest('hex');
};

// Passportの設定
passport.use(
  new LocalStrategy((username, password, done) => {
    const user = users.find(
      (u) =>
        u.user_name === username &&
        u.hased_password === enhash(`${u.salt}${password}`)
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

const passportAuth = passport.authenticate('local');

const login = (req, res) => {
  res.json({ message: 'Login successful' });
};

const checkAuth = (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ authenticated: true, user: req.user });
  } else {
    res.json({ authenticated: false });
  }
};

const logout = (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.json({ message: 'Logout successful' });
  });
  res;
};

module.exports = { enhash, getAllUser, passportAuth, checkAuth, login, logout };

//以下記念。passport使う前に自分で無理くり認証処理していたやつ
// const authentification = async (req, res) => {
//   try {
//     const getAll = await knex
//       .select('*')
//       .from('user_authentification')
//       .orderBy('id');
//     // res.status(200).send(getAll);
//     const { username, password } = req.body;
//     const index = getAll.findIndex((elm) => elm.user_name === username);
//     if (index === -1) {
//       res.status(400).send(`存在しないユーザ名です`);
//     }
//     console.log('saltPW : ', `${getAll[index].salt}${password}`);
//     const hashedPassword = enhash(`${getAll[index].salt}${password}`);
//     console.log('hashedPassword :', hashedPassword);
//     console.log('hashedPasswordDB :', getAll[index].hased_password);

//     if (hashedPassword === getAll[index].hased_password) {
//       res.status(200).send('認証OKです!');
//     } else {
//       res.status(400).send('PWが違います');
//     }
//   } catch (err) {
//     res.status(500).send(`internal Err : ${err}`);
//   }
// };
