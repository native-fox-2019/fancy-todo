const { User } = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const faker = require('faker')
require('dotenv').config()
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);


class UserController {
    static login(request, response, next){
        let login_data = {
            email: request.body.email,
            password: request.body.password
        }
        let userData
        User.findOne({
            where: {
                email: login_data.email
            }
        })
        .then( result => {
            if(!result){
                throw {
                    status_code: 404,
                    message: 'You Are Not Registered Yet'
                }
            }else{
                userData = result
                return bcrypt.compare(login_data.password, result.password)
            }
        } )
        .then( result => {
            if(result){
                let token = jwt.sign({
                    id: userData.id,
                    name: userData.name,
                    email: userData.email
                }, process.env.JWT_KEY)
                response.status(200).json({token})
            }else{
                throw {
                    status_code: 400,
                    message: 'Wrong Password'
                }
            }
        } )
        .catch( err => {
            next(err)
        } )
    }

    static googleLogin(request, response, next){
        let googleToken = request.body.token
        let data_user
        client.verifyIdToken( {
            idToken: googleToken,
            audience: process.env.CLIENT_ID
        } )
        .then( ticket => {
            const payload = ticket.getPayload()
            data_user = {
                name: payload.name,
                email: payload.email,
                password: faker.internet.password()
            }
            return User.findOne( {
                where:{
                    email: data_user.email
                }
            } )
        } )
        .then( result => {
            if(result){
                return result
            }else{
                return User.create(data_user)
            }
        })
        .then( result => {
            let token = jwt.sign( {
                id: result.id,
                name: result.name,
                email: result.email
            }, process.env.JWT_KEY)
            response.status(200).json({token})
        })
        .catch( err =>{
            next(err)
        })
    }

    static register(request, response, next){
        let newData = {
            name: (request.body.name=='')?null:request.body.name,
            email: (request.body.email=='')?null:request.body.email,
            password: request.body.password
        }
        User.findOne({
            where:{
                email: newData.email
            }
        })
        .then( result => {
            if(result){
                throw {
                    status_code: 400,
                    type: 'Bad Request',
                    message: 'Email already registered'
                }
            }else{
                return User.create(newData)
            }
        } )
        .then( result => {
            let token = jwt.sign({
                id: result.id,
                name: result.name,
                email: result.email
            }, process.env.JWT_KEY);
            response.status(201).json({token})
        } )
        .catch( err => {
            next(err)
        } )
    }

}

module.exports = UserController