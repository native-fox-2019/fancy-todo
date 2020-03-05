const { User } = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

class UserController {
    static login(request, response, next){
        let user_data
        User.findOne({
            where:{
                email: request.body.email
            }
        })
        .then( result => {
            if(result){
                user_data = result
                return bcrypt.compare(request.body.password, result.password)
            }else{
                throw {
                    status_code: 404,
                    type: 'Not Found',
                    message: 'Data Not Found'
                }
            }
        } )
        .then( result => {
            if(result){
                let token = jwt.sign({
                    id: user_data.id,
                    name: user_data.name,
                    email: user_data.email
                }, 'rahasia')
                response.status(200).json({token})
            }else{
                throw {
                    status_code: 400,
                    type: 'Bad Request',
                    message: 'Invalid Password'
                }
            }
        } )
        .catch( err => {
            next(err)
        } )
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
            }, 'rahasia');
            response.status(201).json({token})
        } )
        .catch( err => {
            next(err)
        } )
    }

}

module.exports = UserController