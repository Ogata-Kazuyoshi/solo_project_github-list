const knex = require('../knexIndex');

const getAll = async (req, res) => {
  try {
    const getAll = await knex.select('*').from('repository_info').orderBy('id');
    res.status(200).send(getAll);
  } catch (err) {
    res.status(500).send(`internal Err : ${err}`);
  }
};

const createData = async (req, res) => {
  const newInfo = req.body;
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

module.exports = { getAll, createData, updateData, deleteData };
