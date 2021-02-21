/**
 * Delete existing entries and seed values for `table_name`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function seed(knex) {
  return knex('todo')
    .del()
    .then(() => {
      return knex('todo').insert([
        {
          item: 'Read books',
          status:'active',      
          userId: 1,    
          updated_at: new Date()
        },
        {
          item: 'Drink Water',
          status:'active',      
          userId: 1,    
          updated_at: new Date()
        }
      ]);
    });
}
