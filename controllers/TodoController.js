const { Todo } = require('../models')

class TodoController {
    static create(request, response) {
        let newData = {
            title: request.body.title,
            description: request.body.description,
            status: request.body.status,
            due_date: new Date(request.body.due_date)
        }
        Todo.create(newData)
        .then( result => {
            response.status(201).json(result)
        } )
        .catch( err => {
            if(err.name == "SequelizeValidationError"){
                let err_msg = []
                err.errors.forEach(element => {
                    err_msg.push(element.message)
                })
                response.status(400).json({status_code:400, type:"Validation Error", message: err_msg})
            }else{
                response.status(500).json({status_code:500, type:"Server Error"})
            }
        } )
    }

    static read(request, response) {
        Todo.findAll({
            order:[
                ['id', 'ASC']
            ]
        })
        .then( result => {
            response.status(200).json(result)
        } )
        .catch( err => {
            response.status(500).json({status_code:500, type:"Server Error"})
        } )
    }

    static readById(request,response) {
        let find_id = request.params.id
        Todo.findOne({
            where:{
                id: find_id
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
                response.status(404).json(err)
            }else{
                response.status(500).json({status_code:500, type:"Server Error"})
            }
        } )
    }

    static update(request, response) {
        let update_id = request.params.id
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
                        id: update_id
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
            response.status(200).json(updated_data)
        } )
        .catch( err => {
            if(err.status_code == 404){
                response.status(404).json({status_code:404, err})
            }else if(err.name == "SequelizeValidationError"){
                let err_msg = []
                err.errors.forEach(element => {
                    err_msg.push(element.message)
                })
                response.status(400).json({status_code:400, type:"Validation Error", message: err_msg})
            }else{
                response.status(500).json({status_code:500, message:"Server Error"})
            }
        } )
    }

    static delete(request, response) {
        let delete_id = request.params.id
        let delete_data
        Todo.findByPk(delete_id)
        .then( result => {
            if(result){
                delete_data = result
                return Todo.destroy({
                    where:{
                        id: delete_id
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
            if(err.status_code == 404){
                response.status(404).json(err)
            }else{
                response.status(500).json({status_code: 500, type:"Server Error"})
            }
        } )
    }

}

module.exports = TodoController