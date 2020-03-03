'use strict'

const { Todo } = require('../models')
const jwt = require('jsonwebtoken')

class ControllerTodos {
    static postTask(req, res, next) {
        const { title, description, status, due_date } = req.body
        let UserId = req.user.id
        Todo
            .create({ title, description, status, due_date, UserId })
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                next(err)
            })
    }

    static getAll(req, res, next) {
        let id = Number(req.user.id)
        Todo
            .findAll({ where: { UserId: id } })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                next(err)
            })
    }

    static getOne(req, res, next) {
        let id = Number(req.params.id)
        Todo
            .findByPk(id)
            .then(data => {
                if (data !== null) {
                    res.status(200).json(data)
                } else {
                    const errStatus = {
                        status: 404,
                        msg: 'Not Found'
                    }
                    throw errStatus
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static updateData(req, res, next) {
        let id = req.user.id
        const { title, description, status, due_date } = req.body
        Todo
            .update({ title, description, status, due_date }, {
                where: {
                    id: id
                },
                returning: true
            })
            .then(data => {
                if (data[0] == 0) {
                    const errStatus = {
                        status: 404,
                        msg: 'Not Found'
                    }
                    throw errStatus
                } else {
                    res.status(200).json(data[1][0])
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static deleteData(req, res, next) {
        let id = Number(req.params.id)
        Promise.all([Todo.findByPk(id), Todo.destroy({ where: { id: id } })])
            .then(data => {
                if (data[0] !== null) {
                    res.status(200).json(data[0])
                } else {
                    const errStatus = {
                        status: 404,
                        msg: 'Not Found'
                    }
                    throw errStatus
                }
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = ControllerTodos