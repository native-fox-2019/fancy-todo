const { Todo } = require('../models/index');
const createError = require('../helpers/createError');

class TodosController {
    static createTodos(req, res, next) {
        let obj = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }
        Todo.create(obj)
            .then(data => {
                res.status(201).json(data);
            }).catch(err => {
                next(err);
            });
    }
    static getTodos(req, res) {
        Todo.findAll()
            .then(data => {
                res.status(200).json(data);
            }).catch(err => {
                next(err);
            });
    }
    static getTodosId(req, res, next) {
        let id = Number(req.params.id);
        Todo.findOne({ where: { id } })
            .then(data => {
                if (!data) {
                    throw createError(404, 'Id Not Found');
                } else {
                    res.status(200).json(data);
                }
            }).catch(err => {
                next(err);
            });
    }
    static updateTodos(req, res, next) {
        let id = Number(req.params.id);
        let obj = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }
        Todo.update(obj, { where: { id } })
            .then(data => {
                if (data[0] === 0) {
                    throw createError(404, 'Error Not Found');
                } else {
                    res.status(200).json(obj);
                }
            }).catch(err => {
                next(err);
            });
    }
    static deleteTodos(req, res, next) {
        let id = Number(req.params.id);
        let todos = null;
        Todo.findOne({ where: { id } })
            .then(data => {
                if (!data) {
                    throw createError(404, 'Error Not Found');
                } else {
                    todos = data;
                    return Todo.destroy({ where: { id } });
                }
            }).then(() => {
                res.status(200).json(todos);
            }).catch(err => {
                next(err);
            });
    }
}

module.exports = TodosController;