const router = require('express').Router();
const dbController = require('../controllers/dbController');

//DBの情報を全て取得してくるエンドポイント
router.get('/', dbController.getAll);

//新規データを DBに登録するエンドポイント
router.post('/', dbController.createData);

//既存データの編集するエンドポイント
router.put('/:id', dbController.updateData);

//既存データの削除するエンドポイント
router.delete('/:id', dbController.deleteData);

module.exports = router;
