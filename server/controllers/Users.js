const { User } = require('../models')
const jwt = require('jsonwebtoken')
const { compare } = require('../helpers/bcrypt')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

class UserController {

	//Register
	static register(req, res, next){
		let { email, password } = req.body
		
		console.log(email, password)
		User.findOne({
			where: {
				email: email
			}
		})
		.then(data => {
			console.log('saddas')
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
			console.log(err)
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

	static googleSignIn(req, res, next){
		let token = req.body.token
		let email = null;
		client.verifyIdToken({
			idToken: token,
			audience: process.env.CLIENT_ID
		})
		.then(ticket => {
			return ticket.getPayload()
		})
		.then(payload => {
			console.log(payload)
			email = payload.email
			return User.findOne({
				where: {
					email: payload.email
				}
			})
		})
		.then(data => {
			console.log(data)
			if(!data){
				return User.create({
					email: email,
					password: '123'
				})
			}else{
				return data
			}
		})
		.then(data => {
			console.log(data)
			var token = jwt.sign({id: data.id, email: email}, process.env.SECRET)
				res.status(200).json({access_token: token})
		})
	}
}

module.exports = UserController