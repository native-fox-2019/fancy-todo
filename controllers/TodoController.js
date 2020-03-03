const { Todo } = require('../models')
const Op = require('sequelize').Sequelize.Op

class TodoController {
    static create(request, response, next) {
        let newData = {
            title: request.body.title,
            description: request.body.description,
            status: request.body.status,
            due_date: new Date(request.body.due_date),
            user_id: request.userData.id
        }
        Todo.create(newData)
        .then( result => {
            response.status(201).json(result)
        } )
        .catch( err => {
            // next(err)
            if(err.name == "SequelizeValidationError"){
                let err_msg = []
                err.errors.forEach(element => {
                    err_msg.push(element.message)
                })
                let error = {status_code:400, type:"Validation Error", message: err_msg}
                next(error)
                // response.status(400).json({status_code:400, type:"Validation Error", message: err_msg})
            }else{
                next(err)
                // response.status(500).json({status_code:500, type:"Server Error", err})
            }
        } )
    }

    static read(request, response) {
        console.log(request.userData)
        Todo.findAll({
            where:{
                user_id: request.userData.id
            },
            order:[
                ['id', 'ASC']
            ]
        })
        .then( result => {
            response.status(200).json(result)
        } )
        .catch( err => {
            next(err)
            // response.status(500).json({status_code:500, type:"Server Error", err})
        } )
    }

    static readById(request, response, next) {
        let find_id = request.params.task_id
        Todo.findOne({
            where:{
                [Op.and]:[
                    {id: find_id},
                    {user_id: request.userData.id}
                ]
            }
        })
        .then( result => {
            if(result){
                response.status(200).json(result)
            }else{
                throw {
                    status_code: 404,
                    message: "Data Not Found"
                }
            }
        } )
        .catch( err => {
            if(err.status_code == 404){
                next(err)
                // response.status(404).json(err)
            }else{
                next(err)
                // response.status(500).json({status_code:500, type:"Server Error", err})
            }
        } )
    }

    static update(request, response, next) {
        let update_id = request.params.task_id
        let newData = {
            title: request.body.title,
            description: request.body.description,
            status: request.body.status,
            due_date: new Date(request.body.due_date)
        }
        let updated_data
        Todo.findByPk(update_id)
        .then( result => {
            updated_data = result
            if(result){
                return Todo.update(newData, {
                    where: {
                        [Op.and]:[
                            {id: update_id},
                            {user_id: request.userData.id}
                        ]
                    }
                })
            }else{
                throw {
                    status_code: 404,
                    message: "Data Not Found"
                }
            }
        } )
        .then( result => {
            response.status(200).json(result)
        } )
        .catch( err => {
            if(err.status_code == 404){
                next({status_code:404, err})
                // response.status(404).json({status_code:404, err})
            }else if(err.name == "SequelizeValidationError"){
                let err_msg = []
                err.errors.forEach(element => {
                    err_msg.push(element.message)
                })
                next({status_code:400, type:"Validation Error", message: err_msg})
                // response.status(400).json({status_code:400, type:"Validation Error", message: err_msg})
            }else{
                next(err)
                // response.status(500).json({status_code:500, type:"Server Error", err})
            }
        } )
    }

    static delete(request, response, next) {
        let delete_id = request.params.task_id
        let delete_data
        Todo.findByPk(delete_id)
        .then( result => {
            if(result){
                delete_data = result
                return Todo.destroy({
                    where:{
                        [Op.and]:[
                            {id: delete_id},
                            {user_id: request.userData.id}
                        ]
                    }
                })
            }else{
                throw {
                    status_code: 404,
                    message: "Data Not Found"
                }
            }
        } )
        .then( result => {
            response.status(200).json(delete_data)
        } )
        .catch( err => {
            next(err)
            // if(err.status_code == 404){
            //     // next(err)
            //     response.status(404).json(err)
            // }else{
            //     response.status(500).json({status_code: 500, type:"Server Error", err})
            // }
        } )
    }

}

module.exports = TodoController