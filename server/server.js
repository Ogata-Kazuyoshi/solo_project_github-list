// expressのセットアップ
const express = require('express');
const apiRoute = require('./Routes');
// const cors = require('cors');

const setupServer = () => {
  const app = express();
  // app.use(
  //   cors({
  //     origin: 'http://localhost:5173',
  //   })
  // );

  app.use(express.json());
  app.use(express.static('./dist/'));
  app.use('/api/v1', apiRoute);

  return app;
};

module.exports = { setupServer };
