const { User, Todo } = require('../models')
const tokenization = require('../helpers/tokenization')
const bcrypt = require('bcryptjs')

class UserController {
    static read(request, response){
        User.findAll()
        .then( result => {
            response.status(200).json(result)
        } )
        .catch( err => {
            response.status(500).json({
                status_code: 500,
                message: 'System error',
                err
            })
        } )
    }

    static readTodoById(request, response, next){
        Todo.findAll({
            where:{
                id: request.userData
            }
        })
        .then( result => {
            response.status(200).json(result)
        } )
        .catch( err => {
            next(err)
        } )
    }

    static register(request, response, next){
        let newData = {
            name: request.body.name,
            email: request.body.email,
            password: request.body.password
        }
        User.findOne({
            email: newData.email
        })
        .then( result => {
            if(result){
                throw {
                    status_code: 400,
                    message: 'Email already registered'
                }
            }else{
                return User.create( newData )
            }
        } )
        .then( result => {
            response.status(201).json(result)
        } )
        .catch( err => {
            response.status(err.status_code).json(err)
        } )
    }

    static login(request, response, next){
        let login_data = {
            email: request.body.email,
            password: request.body.password
        }
        User.findOne({
            where: {
                email: login_data.email
            }
        })
        .then( result => {
            if(!result){
                throw {
                    status_code: 404,
                    message: 'email not found'
                }
            }else{
                return bcrypt.compare(login_data.password, result.password)
            }
        } )
        .then( result => {
            if(result){
                let token = tokenization(result)
                response.status(200).json({"token":token})
            }else{
                throw {
                    status_code: 400,
                    message: 'Wrong Password'
                }
            }
        } )
        .catch( err => {
            response.status(err.status_code).json(err)
        } )
    }

    static logout(request, response){

    }

}

module.exports = UserController