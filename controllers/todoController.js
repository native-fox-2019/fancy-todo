"use strict"
const { Todo } = require('../models')

class todoController {
    static createTodo(req, res, next) {
        const { title, description, status, due_date } = req.body
        Todo.create()
    }
}

module.exports = todoController