const knex = require('../knexIndex');
const fs = require('fs');
const path = require('path');

const getAll = async (req, res) => {
  // console.log('getAll req.user : ', req.user);
  try {
    const getAll = await knex
      .select({
        id: 'repository_info.id',
        project_name: 'repository_info.project_name',
        create_date: 'repository_info.create_date',
        description: 'repository_info.description',
        like: 'repository_info.like',
      })
      .from('repository_info')
      .join(
        'user_authentification',
        'user_authentification.id',
        'repository_info.user_id'
      )
      .where('user_authentification.user_name', req.user.user_name)
      .orderBy('repository_info.id');
    res.status(200).send(getAll);
  } catch (err) {
    res.status(500).send(`internal Err : ${err}`);
  }
};

const createData = async (req, res) => {
  const newInfo = req.body;
  newInfo.user_id = req.user.id;
  try {
    await knex('repository_info').insert(newInfo);
    res.status(201).send(`data created!`);
  } catch (err) {
    res.status(500).send(`internal Err : ${err}`);
  }
};

const updateData = async (req, res) => {
  const id = +req.params.id;
  const newInfo = req.body;
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
};

const deleteData = async (req, res) => {
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
};

const backupdata = async (req, res) => {
  const padding = (str) => {
    if (String(str).length === 1) {
      return `0${str}`;
    }
    return `${str}`;
  };
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = padding(currentDate.getMonth() + 1);
  const day = padding(currentDate.getDate());
  const hour = padding(currentDate.getHours());
  const min = padding(currentDate.getMinutes());
  const sec = padding(currentDate.getSeconds());
  const now = `${year}-${month}-${day}-${hour}:${min}:${sec}`;

  const allrepo = await knex.select('*').from('repository_info');
  const userInfo = await knex.select('*').from('user_authentification');
  const jsonAllrepo = JSON.stringify(allrepo);
  const jsonUserInfo = JSON.stringify(userInfo);

  // ファイルの保存先ディレクトリを指定
  const filePathrepo = path.join(
    __dirname,
    '../backupdata/repository_info',
    `${now}_repository.json`
  );
  // ファイルにデータを書き込み
  fs.writeFileSync(filePathrepo, jsonAllrepo);
  // ファイルの保存先ディレクトリを指定
  const filePathuser = path.join(
    __dirname,
    '../backupdata/user_authentification',
    `${now}_user.json`
  );
  // ファイルにデータを書き込み
  fs.writeFileSync(filePathuser, jsonUserInfo);

  res.send('バックアップをとりました！');
};

module.exports = { getAll, createData, updateData, deleteData, backupdata };
