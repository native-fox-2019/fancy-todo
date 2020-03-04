const { User } = require('../models')
const jwt = require('jsonwebtoken')
const { compare } = require('../helpers/bcrypt')

class UserController {

	//Register
	static register(req, res, next){
		let { email, password } = req.body

		User.create( { email, password } )
		.then(user => {
			res.status(201).json(user)
		})
		.catch(err => {
      next(err)
		})
	}

	//Login
	static login(req, res, next){
		User.findOne({ where: {
			 email: req.body.email
			} 
		})
		.then(user => {
			if(user !== null){
				let password = req.body.password
				let hashed = user.password
				
				//lakukan comparing
				if(user.password === password){
					const userToken = jwt.sign({
						id: user.id,
						email: user.email,
					},'secret' );
					
					res.header('userToken',  userToken)
					res.status(200).json(userToken)
					
				}else{
					res.status(400).json('Wrong Email or Password!')
				}
			}else{
				res.status(400).json('Wrong Email or Password!')
			}
		})
	}
}

module.exports = UserController