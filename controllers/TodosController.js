const { Todo } = require('../models/index');

class TodosController {
    static createTodos(req, res) {
        if(!req.body.title || !req.body.description || req.body.status === undefined || !req.body.due_date) {
            res.status(400).send('Validation errors');
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
    // static getTodos(req, res) {

    // }
}

module.exports = TodosController;