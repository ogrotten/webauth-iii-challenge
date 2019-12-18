
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'Perfect', password:"sausage", dept: "mountain"},
        {id: 2, username: 'Sufficient', password:"sausage", dept: "valley"},
        {id: 3, username: 'Wat', password:"sausage", dept: "river"}
      ]);
    });
};
