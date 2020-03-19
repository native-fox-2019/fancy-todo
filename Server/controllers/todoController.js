const { Todo } = require('../models')
const createError = require('../helpers/createErrors')

class todoController {

    static add(req, res, next) {
        let obj = {
            title: req.body.title,
            description: req.body.description,
            status: false,
            due_date: req.body.due_date,
            UserId: req.userData.id
        }
        Todo.create(obj)
            .then(data => {
                res.status(201).json(data)
            }).catch(err => {
                next(err)
            })
    }

    static showAll(req, res) {
        let id = {
            where: {
                UserId: req.userData.id
            },
            order: [['id', 'ASC']]
        }
        Todo.findAll(id)
            .then(data => {
                res.status(200).json(data)
            }).catch(err => {
                res.status(500).json(err)
            })
    }

    static showOne(req, res, next) {
        // console.log("masuk show one")
        let id = {
            where: {
                id: req.params.id
            }
        }

        Todo.findOne(id)
            .then(data => {
                if (data) {
                    res.status(200).json(data)
                } else {
                    throw createError(404, `Data for Id ${req.params.id} is not found`)
                }
            }).catch(err => {
                next(err)
            })
    }

    static delete(req, res, next) {
        let id = {
            where: {
                id: req.params.id
            }
        }

        let dataResult = null
        Todo.findOne(id)
            .then(data => {
                dataResult = data
                return Todo.destroy(id)
            })
            .then(data => {
                if (data < 1) {
                    throw createError(404, `Data for Id ${req.params.id} is not found`)
                }
                res.status(200).json(dataResult)
            })
            .catch(err => {
                next(err)
            })
    }

    static edit(req, res, next) {
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

        Todo.update(obj, id)
            .then(data => {
                if (data < 1) {
                    throw createError(404, `Data for Id ${req.params.id} is not found`)
                }
                return Todo.findOne(id)
            }).then(data => {
                res.status(200).json(data)
            }).catch(err => {
                console.log(err)
                next(err)
            })
    }

}

module.exports = todoController