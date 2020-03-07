"use strict"
const { Todo } = require('../models')
class todoController {

    static addTodo(req, res, next) {
        const UserId = req.user.id
        const { title, description, status, due_date, } = req.body
        Todo.create({ title, description, status: 'uncomplete', due_date, UserId })
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                next(err)
            })
    }

    static findAll(req, res, next) {
        const UserId = +req.user.id
        Todo.findAll({ where: { UserId } })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                next(err)
            })
    }

    static findOne(req, res, next) {
        const id = +req.params.id
        Todo.findOne({ where: { id } })
            .then(data => {
                const error = {
                    msg: 'Data not found!',
                    status: 404
                }
                if (data === null) throw (error)
                res.status(200).json(data)
            })
            .catch(err => {
                next(err)
            })
    }

    static updateData(req, res, next) {
        const UserId = req.user.id
        const id = +req.params.id
        const { title, description, status, due_date } = req.body
        Todo.update({ title, description, status, due_date }, { where: { id, UserId }, returning: true })
            .then(data => {
                const error = {
                    msg: 'Data not found!',
                    status: 404
                }
                if (!data[1].length) throw (error)
                res.status(200).json(data[1][0])
            })
            .catch(err => {
                next(err)
            })
    }

    static updateDataStatus(req, res, next) {
        const UserId = req.user.id
        const id = +req.params.id
        const { status } = req.body
        Todo.update({ status }, { where: { id, UserId }, returning: true })
            .then(data => {

                const error = {
                    msg: 'Data not found!',
                    status: 404
                }
                if (!data[1].length) {
                    throw (error)
                } else {
                    res.status(200).json(data[1][0])
                }
            })
            .catch(err => {
                next(err)
            })

    }

    static deleteData(req, res, next) {
        const id = +req.params.id
        Promise.all([Todo.findOne({ where: { id } }), Todo.destroy({ where: { id } })])
            .then(data => {
                const error = {
                    msg: 'Data not found!',
                    status: 404
                }
                if (data[0]) {
                    res.status(200).json(data[0])
                } else {
                    throw (error)
                }
            })
            .catch(err => {
                next(err)
            })
    }

}

module.exports = todoController