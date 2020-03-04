const Model = require(`../models`)
var createError = require('../helpers/createErrors')

class TodosController {

    static create(req, res, next) {
        var { title, description, status, due_date } = req.body
        var obj = {
            title,
            description,
            status,
            due_date,
            UserId: req.userData.id
        }

        Model.Todolist.create(obj)
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                next(err)
            })
    }

    static showAll(req, res, next) {
        Model.Todolist.findAll()
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                next(err)
            })
    }

    static findOne(req, res, next) {
        Model.Todolist.findByPk(Number(req.params.id))
            .then(data => {
                if (data) {
                    res.status(200).json(data)
                } else {
                    // throw createError(404, `No Data of ID ${req.params.id} exists`)
                    
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static update(req, res, next) {
        var { title, description, status, due_date } = req.body
        var obj = {
            title,
            description,
            status,
            due_date
        }

        Model.Todolist.update(obj, {
            where: {
                id: Number(req.params.id)
            }
        })
            .then(data => {
                if (data) {
                    Model.Todolist.findByPk(Number(req.params.id))
                        .then(data => {
                            res.status(200).json(data)
                        })
                } else {
                    throw createError(404, `No Data of ID ${req.params.id} exists`)
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static delete(req, res, next) {
        Model.Todolist.findByPk(Number(req.params.id))
            .then(data => {
                if (data) {
                    Model.Todolist.destroy({
                        where: {
                            id: Number(req.params.id)
                        }
                    })
                    
                    res.status(200).json(data)
                } else {
                    throw createError(404, `No Data of ID ${req.params.id} exists`)
                }
            })
            .catch(err => {
                next(err)
            })
    }

}

module.exports = TodosController