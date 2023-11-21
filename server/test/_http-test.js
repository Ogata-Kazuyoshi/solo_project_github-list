const chai = require('chai');
const { expect } = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const { setupServer } = require('../server');
const config = require('../knexfile');
const knex = require('knex')(config.development);

const tableName = 'repository_info';

const testData = {
  id: 9998,
  project_name: 'test-data',
  create_date: '2020-10-27',
  description: 'test-description',
  like: false,
};

describe('github-list API Server getメソッド', () => {
  let request;
  const server = setupServer();
  beforeEach(async () => {
    request = chai.request(server);
    await knex(tableName)
      .insert(testData)
      .returning('id')
      .then((result) => {
        console.log(`insert data ID : ${result[0].id}`);
      })
      .catch(console.error);
  });

  after(async () => {
    await knex(tableName)
      .where('id', testData.id)
      .returning('id')
      .del()
      .then((result) => {
        console.log('removed test customer');
      })
      .catch(console.error);
  });

  it('/api/v1/dbinformationのエンドポイントでDB情報を全てGETできる', () => {
    request.get('/api/v1/dbinformation').end(function (err, res) {
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      expect(res.body).to.be.a('array');
      expect(res.body[0]).to.have.property('id');
      expect(res.body[0]).to.have.property('project_name');
      expect(res.body[0]).to.have.property('create_date');
      expect(res.body[0]).to.have.property('description');
    });
  });
});

describe('github-list API Server Deleteメソッド', () => {
  let request;
  const server = setupServer();
  beforeEach(async () => {
    request = chai.request(server);
    await knex(tableName)
      .insert(testData)
      .returning('id')
      .then((result) => {
        console.log(`insert data ID : ${result[0].id}`);
      })
      .catch(console.error);
  });

  after(async () => {
    await knex(tableName)
      .where('id', testData.id)
      .returning('id')
      .del()
      .then((result) => {
        console.log('removed test customer');
      })
      .catch(console.error);
  });
  it('/api/v1/dbinformation/:idのエンドポイントで 指定した DB情報を削除できる', async () => {
    const testData2 = {
      id: 5000,
      project_name: 'test-data2',
      create_date: '2000-10-27',
      description: 'test-description2',
      like: false,
    };
    const initial = await knex(tableName).select('*');
    // console.log('initial : ', initial);
    await knex(tableName).insert(testData2);
    //   .returning('id')
    //   .then((result) => {
    //     // console.log(`insert data ID : ${result[0].id}`);
    //   })
    //   .catch(console.error);
    const afterAdd = await knex(tableName).select('*');
    // console.log('afterAdd : ', afterAdd);
    request
      .delete(`/api/v1/dbinformation/${testData2.id}`)
      .end(async function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(204);
        const checkAfterDelete = await knex(tableName).select('*');
        // console.log('checkAfter : ', checkAfterDelete);
        expect(checkAfterDelete).to.deep.equal(initial);
      });
  });
});
