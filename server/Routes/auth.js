const router = require('express').Router();
const authController = require('../controllers/authController');

//ログインエンドポイント
router.post(
  '/login',
  authController.getAllUser,
  authController.passportAuth,
  authController.login
);

// ログアウトエンドポイント
router.get('/logout', authController.logout);

// 認証されているかどうかを確認するエンドポイント
router.get('/checkAuth', authController.checkAuth);

module.exports = router;
