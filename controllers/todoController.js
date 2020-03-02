const { Todo } = require('../models');

class TodoController {
    static addTodo = (req, res) => {
        let toAdd = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }
        Todo.create(toAdd)
        .then(() => {
            res.status(201).json(toAdd);
        })
        .catch(err => {
            if (err.errors) {
                res.status(400).json(err.errors[0]);
            } else {
                res.status(500).json(err);
            }
        })
    }

    static getTodo = (req, res) => {
        Todo.findAll()
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).json(err);
        })
    }

    static findTodo = (req, res) => {
        let findId = { id: req.params.id };
        Todo.findOne({ where: findId })
        .then(data => {
            if (data) {
                res.status(200).json(data);
            } else {
                res.status(404).json(data);
            }
        })
        .catch(err => {
            res.status(500).json(err);
        })
    }

    static editTodo = (req, res) => {
        let editId = { id: req.params.id };
        let editBody = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        };
        Todo.update(editBody, { where: editId })
        .then(data => {
            if (data[0] === 1) {
                res.status(200).json(editBody);
            } else {
                res.status(404).json({ error: 'record not found!' });
            }
        })
        .catch(err => {
            if (err.errors) {
                res.status(400).json(err.errors[0]);
            } else {
                res.status(500).json(err);
            }
        })
    }

    static dropTodo = (req, res) => {
        let dropId = { id: req.params.id };
        let dropBody = {};
        Todo.findOne({ where: dropId })
        .then(data => {
            if (data) {
                dropBody = data;
            } else {
                res.status(404).json({ error: 'record not found!' });
            }
            return Todo.destroy({ where: dropId })
        })
        .then(() => {
            res.status(200).json(dropBody);
        })
        .catch(err => {
            res.status(500).json(err);
        })

        // Todo.destroy({ where: dropId })
        // .then(data => {
        //     if (data[0] === 1) {
        //         res.status(200).json(dropBody);
        //     } else {
        //         res.status(404).json();
        //     }
        // })
        // .catch(err => {
        //     res.status(500).json(err)
        // })
    }
    
}

module.exports = TodoController;