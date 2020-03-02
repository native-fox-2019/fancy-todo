const { Todo } = require('../models')

class TodoController {
    static list(req, res) {
        Todo.findAll()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
    static add (req, res) {
        let todo = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }
        Todo.create(todo)
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            if(err){
                res.status(400).json(err)
            }else{
                res.status(500)
            }
        })
    }
    static getOne(req, res){
        let id = Number(req.params.id);
        Todo.findOne({where: {id}})
        .then(data=> {
            if(data){
                res.status(200).json(data)
            }else{
                throw '404 Not Found'
            }
        })
        .catch(err => { 
            res.status(404).json(err)
        })
    }
    static edit(req, res){
        let id = Number(req.params.id)
        let todo = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }
        Todo.update(todo, {where: {id}})
        .then(data => {
            if(data[0]){
                res.status(200).json(todo)
            }else{
                res.status(404).json('404 Not Found')
            }
        })
        .catch(err => {
            if(err){
                res.status(400).json(err)
            }else{
                res.status(500)
            }
        })
    }
    static delete(req, res){
        let id = Number(req.params.id);
        let dataDeleted = null
        Todo.findOne({where: {id}})
        .then(data => {
            if(data){
                dataDeleted = data
                return Todo.destroy({where: {id}})
            }else{
                throw '404 Not Found'
            }
        })
        .then(data2 => {
            res.status(200).json(dataDeleted)
        })
        .catch(err => {
            if(err){
                res.status(404).json(err)
            }else{
                res.status(500)
            }
        })
    }
}

module.exports = TodoController