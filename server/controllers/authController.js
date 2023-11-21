const crypto = require('crypto');
const knex = require('../knexIndex');

const enhash = (str) => {
  const hash = crypto.createHash('sha256');
  return hash.update(str).digest('hex');
};

const authentification = async (req, res) => {
  try {
    const getAll = await knex
      .select('*')
      .from('user_authentification')
      .orderBy('id');
    // res.status(200).send(getAll);
    const { username, password } = req.body;
    const index = getAll.findIndex((elm) => elm.user_name === username);
    if (index === -1) {
      res.status(400).send(`存在しないユーザ名です`);
    }
    console.log('saltPW : ', `${getAll[index].salt}${password}`);
    const hashedPassword = enhash(`${getAll[index].salt}${password}`);
    console.log('hashedPassword :', hashedPassword);
    console.log('hashedPasswordDB :', getAll[index].hased_password);

    if (hashedPassword === getAll[index].hased_password) {
      res.status(200).send('認証OKです!');
    } else {
      res.status(400).send('PWが違います');
    }
  } catch (err) {
    res.status(500).send(`internal Err : ${err}`);
  }
};

module.exports = { authentification, enhash };
