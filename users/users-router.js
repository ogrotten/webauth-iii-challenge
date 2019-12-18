const router = require('express').Router();

const Users = require('./users-model.js');
const restricted = require('./restricted-middleware.js');

router.post('/register', (req, res) => {
	Users.add()
	.then(newUser => {
		res.json(newUser);
	})
	.catch(err => res.send(err));
});

router.post('/login', (req, res) => {
  Users.find()
	.then(users => {
	  res.json(users);
	})
	.catch(err => res.send(err));
});

router.get('/users', restricted, (req, res) => {
  Users.find()  
    .then(users => {
      res.json(users);  
    })  
    .catch(err => res.send(err));
});	

module.exports = router;
