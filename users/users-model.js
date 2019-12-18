const db = require('../data/dbConfig.js');

module.exports = {
	add,
	find,
	findById,
	findByDept
};

async function add(user) {
	// sends info, gets id back
	// id is destructured from an array?
	const [id] = await db('users').insert(user);

	return findById(id);
}

function find() {
	return db('users');
}

function findById(id) {
	return db('users')
		.where({ id })
		.first();
}

function findByDept(dept) {
	return db('users')
		.where({ dept })
		.first();
}
