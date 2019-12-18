const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const Users = require('../users/users-model.js');

const SECRET = "secret phrase";

function clg(...x) {console.log(...x)};

module.exports = (req, res, next) => {
	// const { username, password } = req.headers;
	const user = req.body.username;
	clg(req.body);
	const token = signToken(user);
	jwt.verify(token, SECRET, (err, decoded) => {
		console.log("13",decoded) // bar
		Users.findBy({ username })
			.first()
			.then(user => {
				if (user && bcrypt.compareSync(password, user.password)) {
					next();
				} else {
					res.status(401).json({ message: 'Invalid Credentials' });
				}
			})
			.catch(error => {
				res.status(500).json({ message: 'Ran into an unexpected error' });
			});
	})
	// res.status(400).json({ message: 'No credentials provided' });
}

function signToken(user) {
	const payload = {
		username: user.username
	}

	const secret = process.env.JWT_SECRET || SECRET;

	const options = {
		expiresIn: "1h",
	}

	return jwt.sign(payload, secret, options)
}
