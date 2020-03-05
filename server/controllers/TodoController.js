const { Todo } = require('../models')
const Op = require('sequelize').Sequelize.Op

class TodoController {
    static create(request, response, next){
        let newData = {
            title: (request.body.title=='')?null:request.body.title,
            description: (request.body.description=='')?null:request.body.description,
            status: (request.body.status=='')?null:request.body.status,
            user_id: 1,                              //Ganti
            due_date: new Date( request.body.due_date )
        }
        Todo.create(newData)
        .then( result => {
            response.status(201).json(result)
        } )
        .catch( err => {
            if(err.name == 'SequelizeValidationError'){
                let err_msg = []
                err.errors.forEach(element => {
                    err_msg.push(element.message)
                });
                next({
                    status_code: 400,
                    type: 'Validation Error',
                    message: err_msg
                })
            }else{
                next(err)
            }
        } )
    }

    static read(request, response, next){
        Todo.findAll({
            where:{
                user_id: 1                  //Ganti
            }
        })
        .then( result => {
            response.status(200).json(result)
        } )
        .catch( err => {
            next(err)
        } )
    }

    static readById(request, response, next){
        Todo.findOne({
            where:{
                [Op.and]:[
                    {id: request.params.id},
                    {user_id: 1}                //Ganti
                ]
            }
        })
        .then( result => {
            if(result){
                response.status(200).json(result)
            }else{
                throw {
                    status_code: 404,
                    type: 'Data Not Found'
                }
            }
        } )
        .catch( err => {
            if(err.status_code == 404){
                response.status(404).json(err)
            }else{
                next({
                    status_code: 500,
                    type: 'System Error'
                })
            }
        } )
    }

    static update(request, response, next){
        let newData = {
            title: (request.body.title=='')?null:request.body.title,
            description: (request.body.description=='')?null:request.body.description,
            status: (request.body.status=='')?null:request.body.status,
            due_date: new Date( request.body.due_date )
        }
        let todo_data
        Todo.findOne({
            where:{
                [Op.and]: [
                    {id: request.params.id},
                    {user_id: 1}                    //Ganti
                ]
            }
        })
        .then( result => {
            console.log(result)
            if(result){
                todo_data = result
                return Todo.update(newData, {
                    where:{
                        [Op.and]: [
                            {id: request.params.id},
                            {user_id: 1}                    //Ganti
                        ]
                    }
                })
            }else{
                throw {
                    status_code: 404,
                    type: 'Data Not Found'
                }
            }
        } )
        .then( result => {
            // console.log(result)
            response.status(200).json(todo_data)
        } )
        .catch( err => {
            response.json(err)
        } )
    }

    static delete(request, response, next){
        let todo_data
        Todo.findByPk(request.params.id)
        .then( result => {
            if(result){
                todo_data = result
                return Todo.destroy({
                    where:{
                        id:request.params.id
                    }
                })
            }else{
                throw {
                    status_code: 404,
                    type: 'Data Not Found'
                }
            }
        } )
        .then( result => {
            console.log(result)
            response.status(200).json(todo_data)
        } )
        .catch( err => {
            response.json(err)
        } )
    }

}

module.exports = TodoController