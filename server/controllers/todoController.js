const { Todo } = require('../models');
const createError = require('http-errors');
const holidayIdn = require('../helpers/holidayAPI');

class TodoController {
    static addTodo = (req, res, next) => {
        let toAdd = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
            UserId: req.userData.id
        };
        return holidayIdn(req.body.due_date)
        .then(holiday => {
            console.log(holiday,'=====================================================');
            if (holiday.holidays.length) {
                toAdd.title += ` [${holiday.holidays[0].name}]`;
            }
            return Todo.create(toAdd);
        })
        .then(() => {
            res.status(201).json(toAdd);
        })
        .catch(err => {
            next(err);
        })
    }

    static getTodo = (req, res, next) => {
        let UserId = req.userData.id;
        Todo.findAll({ where: { UserId } })
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            next(err);
        })
    }

    static findTodo = (req, res, next) => {
        let findId = {
            id: req.params.id,
            UserId: req.userData.id
        }
        Todo.findOne({ where: findId })
        .then(data => {
            if (data) {
                res.status(200).json(data);
            } else {
                throw createError(404, 'ItemNotFound');
            }
        })
        .catch(err => {
            next(err);
        })
    }

    static editTodo = (req, res, next) => {
        let editId = {
            id: req.params.id,
            UserId: req.userData.id
        };
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
                throw createError(404, 'ItemNotFound');
            }
        })
        .catch(err => {
            next(err);
        })
    }

    static dropTodo = (req, res, next) => {
        let dropId = {
            id: req.params.id,
            UserId: req.userData.id
        };
        let dropBody = {};
        Todo.findOne({ where: dropId })
        .then(data => {
            if (data) {
                dropBody = data;
            } else {
                throw createError(404, 'ItemNotFound');
            }
            return Todo.destroy({ where: dropId });
        })
        .then(() => {
            res.status(200).json(dropBody);
        })
        .catch(err => {
            next(err);
        })
    }
    
}

module.exports = TodoController;