const Model = require('../models')
const Todo = Model.Todo

class TodosController {

    static add(req, res, next) {
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
                next(err)
            })
    }

    static getAll(req, res, next) {
        Todo.findAll()
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                next(err)
            })
    }

    static getOne(req, res, next) {
        let id = req.params.id
        Todo.findOne({ where: { id: id } })
            .then(data => {
                if (data !== null) {
                    res.status(200).json(data)
                } else {
                    next({
                        msg: "id not found !"
                    })
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static edit(req, res, next) {
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
                    next({
                        msg: "id not found !"
                    })
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static delete(req, res, next) {
        let id = req.params.id
        let dataDelete = null
        Todo.findOne({ where: { id: id } })
            .then(data => {
                    dataDelete = data
                    return Todo.destroy({ where: { id: id } })
            })
            .then(() => {
                if (dataDelete === null) {
                    next({
                        msg: "id not found !"
                    })
                } else {
                    res.status(200).json(dataDelete)
                }

            })
            .catch(err => {
                next(err)
            })
    }

}

module.exports = TodosController