// expressのセットアップ
const express = require('express');
const apiRoute = require('./Routes');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const session = require('express-session');

const setupServer = () => {
  const app = express();
  app.use(cookieParser());
  // app.use(
  //   cors({
  //     origin: 'http://localhost:5173',
  //     credentials: true,
  //   })
  // );

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(
    session({
      secret: 'your-secret-key2',
      resave: false,
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());

  app.use(express.static('./dist/'));
  app.use('/api/v1', apiRoute);

  app.get('/login', (req, res) => {
    res.redirect('/');
  });
  app.get('/main', (req, res) => {
    res.redirect('/');
  });
  //
  return app;
};

module.exports = { setupServer };
