const fs = require('fs');
const path = require('path');

const person = {
  name: 'Taro',
  age: 25,
};

const personJSON = JSON.stringify(person);

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

// ファイルの保存先ディレクトリを指定
const filePath = path.join(__dirname, 'backupdata', `${now}_info.json`);

// ファイルにデータを書き込み
fs.writeFileSync(filePath, personJSON);

console.log('ファイルに書き込みました:', filePath);
