const bcrypt = require('bcrypt');

const hash = bcrypt.hashSync(process.env.USER, 10)

/**
 * Delete all existing entries and seed users table.
 *
 * @param   {Object} knex
 * @returns {Promise}
 */
export function seed(knex) {
  return knex('users')
    .del()
    .then(() => {
      return knex('users').insert([
        {
          email:'abc@abc.com',
          password:hash,          
          updated_at: new Date()
        }
      ]);
    });
}
