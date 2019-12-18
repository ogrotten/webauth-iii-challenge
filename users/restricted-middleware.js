const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Users = require("../users/users-model.js");

const SECRET = process.env.JWT_SECRET || "secret phrase";

function clg(...x){console.log(...x)};

module.exports = (req, res, next) => {
	const { authorization } = req.headers;

	if (authorization) {
		jwt.verify(authorization, SECRET, function(err, decodedToken){
			if (err) {
				res.status(401).json({message: "Invalid Token"});
			} else {
				req.token = decodedToken;
				next();
			}
		})
	} else {
		res.status(400).json({message: "Login first"});
	}
};