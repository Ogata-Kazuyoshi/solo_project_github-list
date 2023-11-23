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
      user_name: 'user3',
      salt: '20a7be6fc3b0',
      hased_password:
        'd08038eb6a48539f4dd658686679fea6da74ef38c77616295d092b18dab48beb',
    },
  ]);
};
