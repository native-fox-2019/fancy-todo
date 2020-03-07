const { Todo, User } = require('../models');
const createError = require('http-errors');
const axios = require('axios');

class TodoController {
    static addTodo = (req, res, next) => {
        let toAdd = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
            UserId: req.userData.id
        };
        axios.get(`https://calendarific.com/api/v2/holidays?&api_key=${process.env.CALENDARIFIC_API_KEY}&country=ID&year=${toAdd.due_date.split('-')[0]}&month=${toAdd.due_date.split('-')[1]}&day=${toAdd.due_date.split('-')[2]}`)
        .then(holiday => {
            console.log(holiday.data.response.holidays.length);
            if (holiday.data.response.holidays.length) {
                toAdd.title += ` [${holiday.data.response.holidays[0].name}]`
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
        let UserEmail = null
        User.findOne({ where: UserId })
        .then(user => {
            UserEmail = user.email;
            return Todo.findAll({ where: { UserId } })
        })
        .then(todos => {
            res.status(200).json({ UserEmail, todos });
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