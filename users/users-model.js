const db = require('../data/dbConfig.js');

module.exports = {
	add,
	find,
	findBy,
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

function findBy(filter) {
	return db('users').where(filter);
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
