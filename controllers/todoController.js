const { todo } = require('../models')

class TodoController {
    static getTodo = (req, res, next) => {
        todo.findAll()
            .then((data) => {
                res.status(200).json(data)
            })
            .catch((err) => {
                res.status(500).json(err)
            })
    }

    static getTodoId = (req, res) => {
        let id = Number(req.params.id)
        todo.findAll({
            where: {
                id: id
            }
        })
            .then((data) => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(404).json(err)
            })

    }

    static addTodo = (req, res) => {
        let obj = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }
        todo.create(obj)
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                res.status(404).json(err)
            })
    }

    static editTodo = (req, res) => {
        let id = {
            where: {
                id: req.params.id
            }
        }
        let obj = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }
        todo.update(obj, id)
            .then(data => {
                res.status(200).json(obj)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static deleteTodo = (req, res) => {
        let id = Number(req.params.id)
        let temp = null
        todo.findByPk(id)
            .then(data => {
                temp = data
                return todo.destroy({
                    where: {
                        id: id
                    }
                })
            })
            .then(data => {
                res.status(200).json(temp)
            })
            .catch(err => {
                res.status(500).json(err)
            })
        }
}

module.exports = TodoController