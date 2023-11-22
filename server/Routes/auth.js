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
//新規登録用のエンドポイント
router.post(
  '/signup',
  authController.getAllUser,
  authController.passportSignup,
  authController.signup
);

module.exports = router;
