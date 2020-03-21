const { Todo } = require('../models')

class TodoController {
    static list(req, res, next) {
        Todo.findAll({where: {UserId: req.userData.id}})
        .then(data => {
            data.sort((a, b) => {
                return a.due_date - b.due_date
            })
            res.status(200).json(data)
        })
        .catch(err => {
            next({status: 500, msg: 'Server Error'})
        })
    }
    static add (req, res, next) {
        let todo = {
            title: req.body.title,
            description: req.body.description,
            status: "Uncomplete",
            due_date: req.body.due_date,
            UserId : req.userData.id
        }
        Todo.create(todo)
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            if(err.errors){
                let error = []
                err.errors.forEach((item) => {
                    error.push({
                        type: item.type,
                        msg: item.message
                    })
                })
                next({status: 400, error: error})
            }else{
                next({status: 500, msg: 'Server Error'})
            }
        })
    }
    static getOne(req, res, next){
        let id = Number(req.params.id);
        Todo.findOne({where: {id}})
        .then(data=> {
            if(data){
                res.status(200).json(data)
            }else{
                next({status: 404, msg: '404 not found'})
            }
        })
        .catch(err => { 
            next({status: 500, msg: 'Server Error'})
        })
    }
    static edit(req, res, next){
        let id = Number(req.params.id)
        let todo = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
            UserId : req.userData.id
        }
        Todo.update(todo, {where: {id}})
        .then(data => {
            if(data[0]){
                res.status(200).json(todo)
            }else{
                next({status: 404, msg: '404 not found'})
            }
        })
        .catch(err => {
            if(err.errors){
                let error = []
                err.errors.forEach((item) => {
                    error.push({
                        type: item.type,
                        msg: item.message
                    })
                })
                next({status: 400, error: error})
            }else{
                next({status: 500, msg: 'Server Error'})
            }
        })
    }
    static delete(req, res, next){
        let id = Number(req.params.id);
        let dataDeleted = null
        Todo.findOne({where: {id}})
        .then(data => {
            if(data){
                dataDeleted = data
                return Todo.destroy({where: {id}})
            }else{
                next({status: 404, msg: '404 not found'})
            }
        })
        .then(data2 => {
            res.status(200).json(dataDeleted)
        })
        .catch(err => {
            if(err){
                next({status: 404, msg: '404 not found'})
            }else{
                next({status: 500, msg: 'Server Error'})
            }
        })
    }
}

module.exports = TodoController