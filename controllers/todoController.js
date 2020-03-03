const { todo } = require('../models')

class TodoController {
    static getTodo = (req, res) => {
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
                if (data.length == 0) {
                    res.status(404).json({ message: `id not found` })
                } else {
                    res.status(200).json(data)
                }
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
                if (err) {
                    let obj = {
                        error: []
                    }
                    for (let i = 0; i < err.errors.length; i++) {
                        obj.error.push(err.errors[i].message)
                    }
                    res.status(400).json(obj)
                } else {
                    res.status(500).json(err)
                }
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
                if (data[0] == 1) {
                    res.status(200).json(obj)
                } else if (data[0] == 0) {
                    res.status(404).json(`id tidak ditemukan`)
                }
            })
            .catch(err => {
                if (err) {
                    res.status(400).json(err.errors[0].message)
                } else {
                    res.status(500).json(err)
                }
            })
    }

    static deleteTodo = (req, res) => {
        let id = Number(req.params.id)
        let temp = null
        todo.findByPk(id)
            .then(data => {
                temp = data
                if (data) {
                    return todo.destroy({
                        where: {
                            id: id
                        }
                    })
                } else {
                    res.status(404).json(`data not found`)
                }
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