const Model = require('../models')
const Todo = Model.Todo

class TodosController {

    static add(req, res) {
        let obj = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }
        Todo.create(obj)
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                if (err.errors) {
                    res.status(400).json(err.errors)
                } else {
                    res.status(500).json(err)
                }
            })
    }

    static getAll(req, res) {
        Todo.findAll()
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static getOne(req, res) {
        let id = req.params.id
        Todo.findOne({ where: { id: id } })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(404).json(err)
            })
    }

    static edit(req, res) {
        let id = req.params.id
        let obj = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }

        Todo.update(obj, { where: { id: id } })
            .then(data => {
                if (data[0] !== 0) {
                    res.status(200).json(obj)
                } else {
                    throw new Error("error, id not found!")
                }
            })
            .catch(err => {
                if (err.name === "SequelizeValidationError") {
                    res.status(400).json(err.errors[0].message)
                } else if(err.message){
                    res.status(404).json(err.message)
                } else {
                    res.status(500).json(err)
                }
            })
    }

    static delete(req, res) {
        let id = req.params.id
        let dataDelete = null
        Todo.findOne({ where: { id: id } })
            .then(data => {
                if (data !== null) {
                    dataDelete = data
                    return Todo.destroy({ where: { id: id } })
                } else {
                    throw new Error("error, id not found!")
                }
            })
            .then(() => {
                res.status(200).json(dataDelete)
            })
            .catch(err => {
                if (err.message === "error, id not found!") {
                    res.status(404).json(err.message)
                } else {
                    res.status(500).json(err.message)
                }
            })
    }

}

module.exports = TodosController