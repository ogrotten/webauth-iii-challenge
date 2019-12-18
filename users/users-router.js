const router = require('express').Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Users = require('./users-model.js');
const restricted = require('./restricted-middleware.js');

const SECRET = process.env.JWT_SECRET || "secret phrase";

function clg(...x) { console.log(...x) }

router.post('/register', (req, res) => {
	let user = req.body;
	const hash = bcrypt.hashSync(user.password, 8); // 2^n
	user.password = hash;

	Users.add(user)
		.then(newUser => {
			res.status(201).json(newUser);
		})
		.catch(err => res.send(err));
});

router.post('/login', (req, res) => {
	let { username, password } = req.body;
	Users.findBy({ username })
		.first()
		.then(user => {
			if (user && bcrypt.compareSync(password, user.password)) {
				// sign token
				const token = signToken(user);

				// send token
				res.status(200).json({
					token, // token is now part of the response
					message: `welcome ${user.username}`
				});
			} else {
				res.status(401).json({ message: "invalid credentials" })
			}
		})
		.catch(err => res.status(500).json(err));
});

router.get('/users', restricted, (req, res) => {
	Users.find()
		.then(users => {
			res.json(users);
		})
		.catch(err => res.send(err));
});

module.exports = router;

function signToken(user) {
	const payload = {
		username: user.username,
		dept: user.dept
	};

	const options = {
		expiresIn: "1h"
	};

	// RETURN vvv
	return jwt.sign(payload, SECRET, options);

}