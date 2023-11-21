// expressのセットアップ
const express = require("express");
const apiRoute = require("./Routes");
const cors = require("cors");

const setupServer = () => {
  const app = express();
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );

  app.use(express.json());
  app.use("/api/v1", apiRoute);

  return app;
};

module.exports = { setupServer };

// sampleデータベースのbooksテーブルから全てのデータを取得

// app.listen(8080, () => {
//   console.log(`サーバーが立ち上がりました: http://localhost:8080`);
// });
