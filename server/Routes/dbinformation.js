const router = require('express').Router();

// knexのセットアップ
// require('dotenv').config();
// const config = require('../knexfile');
// console.log(config);
// const knex = require('knex')(config);
const knex = require('../knexIndex');

//DBの情報を全て取得してくるエンドポイント
router.get('/', async (req, res) => {
  try {
    const getAll = await knex.select('*').from('repository_info').orderBy('id');
    res.status(200).send(getAll);
  } catch (err) {
    res.status(500).send(`internal Err : ${err}`);
  }
});

//新規データを DBに登録するエンドポイント
router.post('/', async (req, res) => {
  const newInfo = req.body;
  // newInfo = {project_name: aaa, create_date: 'xx-xx-xx',description:'xx/aa/cc',like:false}
  try {
    await knex('repository_info').insert(newInfo);
    res.status(201).send(`data created!`);
  } catch (err) {
    res.status(500).send(`internal Err : ${err}`);
  }
});

//既存データの編集するエンドポイント
router.put('/:id', async (req, res) => {
  const id = +req.params.id;
  const newInfo = req.body;
  // console.log("newInfo :", newInfo);
  if (!id) {
    res.status(400).send(`idは数字を入力してください`);
  } else {
    const currentDB = await knex.select('*').from('repository_info');
    const index = currentDB.findIndex((elm) => elm.id === id);
    if (index === -1) {
      res.status(400).send(`存在しないidです。`);
    } else {
      const updateInfo = currentDB[index];
      for (const key in newInfo) {
        if (newInfo[key] !== updateInfo[key]) updateInfo[key] = newInfo[key];
      }
      const update = await knex('repository_info')
        .update(updateInfo)
        .where({ id: id })
        .returning('id')
        .then((elm) => elm[0].id);
      res.status(200).send(`UPDATE id: ${update}`);
    }
  }
});

//既存データの削除するエンドポイント
router.delete('/:id', async (req, res) => {
  const id = +req.params.id;
  if (!id) {
    res.status(400).send(`idは数字を入力してください`);
  } else {
    const currentDB = await knex.select('*').from('repository_info');
    const index = currentDB.findIndex((elm) => elm.id === id);
    if (index === -1) {
      res.status(400).send(`存在しないidです。`);
    } else {
      const deleteInfo = await knex('repository_info').where({ id: id }).del();
      res.status(204).end();
    }
  }
});

module.exports = router;
