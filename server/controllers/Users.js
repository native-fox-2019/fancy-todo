const { User } = require('../models')
const jwt = require('jsonwebtoken')
const { compare } = require('../helpers/bcrypt')

class UserController {

	//Register
	static register(req, res, next){
		let { email, password } = req.body

		User.findOne({
			where: {
				email
			}
		})
		.then(data => {
			if(data){
				next({
					status: 403,
					message: 'user already exist'
				})
			}else{
				return User.create( { email, password } )
			}
		})
		.then(user => {
			res.status(201).json(user)
		})
		.catch(err => {
      next(err)
		})
	}

	//Login
	static login(req, res, next){
		let userToken = null
		User.findOne({ where: {
			 email: req.body.email
			} 
		})
		.then(user => {
			if(user){
				let password = req.body.password
				let hashed = user.password
				
				userToken = {
					id: user.id,
					email: user.email
				}
				
				return compare(password, hashed)
			}else{
				next({
					status: 404,
					message: 'Wrong email or password'
				})
			}
		})
		.then(result =>{
			if(result){
				userToken = jwt.sign(userToken, process.env.SECRET)
				req.header = userToken
				req.userToken = userToken

				res.status(200).json(userToken)
				next()
			}else{
				next({
					status: 404,
					message: 'Wrong email or password'
				})
			}
		})
		.catch(err => {
			next(err)
		})
	}
}

module.exports = UserController