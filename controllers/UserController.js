const { User, Todo } = require('../models')
const tokenization = require('../helpers/tokenization')
const bcrypt = require('bcryptjs')
const axios = require('axios')
require('dotenv').config()

class UserController {
    static read(request, response, next){
        User.findAll()
        .then( result => {
            response.status(200).json(result)
        } )
        .catch( err => {
            next(err)
            // response.status(500).json({
            //     status_code: 500,
            //     message: 'System error',
            //     err
            // })
        } )
    }

    static readTodoById(request, response, next){
        Todo.findAll({
            where:{
                user_id: request.userData.id
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
            next(err)
            // response.status(err.status_code).json(err)
        } )
    }

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
                    message: 'email not found'
                }
            }else{
                userData = result
                return bcrypt.compare(login_data.password, result.password)
            }
        } )
        .then( result => {
            if(result){
                let token = tokenization(userData)
                response.status(200).json({"token":token})
            }else{
                throw {
                    status_code: 400,
                    message: 'Wrong Password'
                }
            }
        } )
        .catch( err => {
            next(err)
            // response.status(err.status_code).json(err)
        } )
    }

    static logout(request, response){

    }

    static holidays(request, response, next){
        axios({
            method: 'get',
            url: `https://calendarific.com/api/v2/holidays?&api_key=${process.env.API_KEY}&country=ID&year=2020`,
        })
        .then(result => {
            let data_holiday = []
            result.data.response.holidays.forEach(element => {
                data_holiday.push({
                    name: element.name,
                    description: element.description,
                    date: element.date.iso
                })
            });
            response.status(200).json(data_holiday)
        })
        .catch(err => {
            next(err)
        })
    }

}

module.exports = UserController