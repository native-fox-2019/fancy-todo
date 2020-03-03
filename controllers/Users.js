const { User } = require('../models')

class UserController {
	static register(req, res){
		let { email, password } = req.body

		User.create( { email, password } )
		.then(user => {
			res.status(201).json(user)
		})
		.catch(err => {
			res.status(400).json(err)
		})
	}

	static login(req, res){
		
	}
}

module.exports = UserController