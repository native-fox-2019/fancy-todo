const Model = require(`../models`)

class TodosController {

    static create(req, res, next) {
        var { title, description, status, due_date } = req.body
        var obj = {
            title,
            description,
            status,
            due_date
        }

        Model.Todolist.create(obj)
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                next(err)
            })
    }

    static showAll(req, res, next) {
        Model.Todolist.findAll()
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                next(err)
            })
    }

}

module.exports = TodosController