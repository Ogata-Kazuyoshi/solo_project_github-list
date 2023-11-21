/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('repository_info').del();
  // console.log('ここまでは問題なし！！');
  await knex('repository_info').insert([
    {
      project_name: 'dig-imr-5-precourse.hatch-dig',
      create_date: '2023-10-16',
      description: 'week2/chai',
      like: false,
    },
    {
      project_name: 'dig-imr-5-precourse.pokemon-dig',
      create_date: '2023-10-17',
      description: 'week2/chai',
      like: false,
    },
    {
      project_name: 'dig-imr-5-precourse.closures-part-1-dig',
      create_date: '2023-10-18',
      description: 'week2/closure/jasmine',
      like: false,
    },
    {
      project_name: 'dig-imr-5-precourse.loscore-dig',
      create_date: '2023-10-18',
      description: 'week2/jasmine/lodash/underscore',
      like: false,
    },
    {
      project_name: 'dig-imr-5-precourse.closures-part-2-dig',
      create_date: '2023-10-20',
      description: 'week2/jasmine/closure',
      like: false,
    },
    {
      project_name: 'dig-imr-5-dig.assessment-1',
      create_date: '2023-10-23',
      description: 'week3/assesment/',
      like: false,
    },
    {
      project_name: 'dig-imr-5-precourse.stacks-and-queues-dig',
      create_date: '2023-10-23',
      description: 'week3/chai/class',
      like: false,
    },
    {
      project_name: 'dig-imr-5-precourse.polymorphism-dig',
      create_date: '2023-10-23',
      description: 'week3/chai/class/polymorphism',
      like: false,
    },
    {
      project_name: 'dig-imr-5-precourse.node-dig',
      create_date: '2023-10-24',
      description: 'week3/chai/node',
      like: false,
    },
    {
      project_name: 'dig-imr-5-mini.amazonian-async-dig',
      create_date: '2023-10-25',
      description: 'week3/chai/promise/async',
      like: false,
    },
    {
      project_name: 'dig-imr-5-mini.populatron-dig',
      create_date: '2023-10-25',
      description: 'week3/chai/csv/promise/async',
      like: false,
    },
    {
      project_name: 'dig-imr-5-mini.fetch-pokemon-dig',
      create_date: '2023-10-25',
      description: 'week3/chai/fetch/',
      like: false,
    },
    {
      project_name: 'dig-imr-5-lecture.http',
      create_date: '2023-10-27',
      description: 'week3/express/node/postman',
      like: false,
    },
    {
      project_name: 'dig-imr-5-dig.assessment-2',
      create_date: '2023-10-30',
      description: 'week4/assesment/promise/async/fetch',
      like: false,
    },
    {
      project_name: 'dig-imr-5-sprint.express-http',
      create_date: '2023-10-30',
      description: 'week4/node/express',
      like: false,
    },
    {
      project_name: 'dig-imr-5-sprint.express',
      create_date: '2023-10-30',
      description: 'week4/node/experss/',
      like: false,
    },
    {
      project_name: 'dig-imr-5-sprint.rest-dig',
      create_date: '2023-11-01',
      description: 'week4/chai/node/express/rest/rooting',
      like: false,
    },
    {
      project_name: 'dig-imr-5-dig.assessment-3',
      create_date: '2023-11-06',
      description: 'week5/chai/assesment/node/rest',
      like: false,
    },
    {
      project_name: 'dig-imr-5-sprint.database-part-1-dig',
      create_date: '2023-11-06',
      description: 'week5/postgres',
      like: false,
    },
    {
      project_name: 'dig-imr-5-sprint.knex-dig',
      create_date: '2023-11-07',
      description: 'week5/chai/postgres/knex',
      like: false,
    },
    {
      project_name: 'dig-imr-5-sprint.state-machine',
      create_date: '2023-11-09',
      description: 'week5/state',
      like: false,
    },
    {
      project_name: 'dig-imr-5-dig.assessment-4',
      create_date: '2023-11-13',
      description: 'week6/assesment/chai/postgres/knex',
      like: false,
    },
    {
      project_name: 'dig-imr-5-lecture.react-dig',
      create_date: '2023-11-13',
      description: 'week6/react',
      like: false,
    },
    {
      project_name: 'dig-imr-5-sprint.react-dig',
      create_date: '2023-11-14',
      description: 'week6/react/aws/base64/window-width',
      like: false,
    },
    {
      project_name: 'dig-imr-5-sprint.react-typescript-dig',
      create_date: '2023-11-16',
      description: 'week6/react/typescript',
      like: false,
    },
    {
      project_name: 'dig-imr-5-sprint.fullstack-deployment-dig',
      create_date: '2023-11-17',
      description: 'week6/postgres/knex/deploy/full-stack',
      like: false,
    },
    {
      project_name: 'dig-imr-5-dig.assessment-5',
      create_date: '2023-11-20',
      description: 'week7/assesment/react/materialUI',
      like: false,
    },
  ]);
};
