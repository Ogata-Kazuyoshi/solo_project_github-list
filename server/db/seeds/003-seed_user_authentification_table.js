/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('user_authentification').insert([
    {
      id: 1,
      user_name: 'Ogata-Kazuyoshi',
      salt: '402b1558961f',
      hased_password:
        '43b6e568b912a58119789ff0acdbfb62ffd271358f755157801d13dfccf2cac6',
    },
    {
      id: 2,
      user_name: 'user1',
      salt: 'a1b92z7',
      hased_password:
        '41daafda9a68bcbbe970606097cc1c3155603210cadd4a0799527c1cc3427c46',
    },
    {
      id: 3,
      user_name: 'user2',
      salt: 'Ulztl2',
      hased_password:
        '397f02aa1c5375e3b1f4b5863c624ae369ead8e2f7af53e3fc7af9e2573cdc6',
    },
  ]);
};
