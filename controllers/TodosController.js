const { Todo } = require('../models/index');

class TodosController {
    static createTodos(req, res) {
        if(!req.body.title || !req.body.description || req.body.status === undefined || !req.body.due_date) {
            res.status(400).json({ msg: 'Validation errors' });
        } else {
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
                    res.status(500).json(err);
                });
        }
    }
    static getTodos(req, res) {
        Todo.findAll()
            .then(data => {
                res.status(200).json(data);
            }).catch(err => {
                res.status(500).json(err);
            });
    }
    static getTodosId(req, res) {
        let id = Number(req.params.id);
        Todo.findOne({ where: { id } })
            .then(data => {
                if (!data) {
                    res.status(404).json({ msg: 'Error Not Found' });
                } else {
                    res.status(200).json(data);
                }
            }).catch(err => {
                res.status(404).json(err);
            });
    }
    static updateTodos(req, res) {
        let id = Number(req.params.id);
        if(!req.body.title || !req.body.description || req.body.status === undefined || !req.body.due_date) {
            res.status(400).json({ msg: 'Validation errors' });
        } else {
            let obj = {
                title: req.body.title,
                description: req.body.description,
                status: req.body.status,
                due_date: req.body.due_date
            }
            Todo.update(obj, { where: { id } })
                .then(data => {
                    if (data[0] === 0) {
                        res.status(404).json({ msg: 'Error Not Found' });
                    } else {
                        return Todo.findOne({ where: { id } })
                    }
                }).then(todo => {
                    res.status(200).json(todo);
                }).catch(err => {
                    res.status(500).json(err);
                });
        }
    }
    static deleteTodos(req, res) {
        let id = Number(req.params.id);
        let todos = null;
        Todo.findOne({ where: { id } })
            .then(data => {
                if (!data) {
                    res.status(404).json({ msg: 'Error Not Found' });
                } else {
                    todos = data;
                    return Todo.destroy({ where: { id } });
                }
            }).then(() => {
                res.status(200).json(todos);
            }).catch(err => {
                res.status(500).json(err);
            });
    }
}

module.exports = TodosController;