const {Todo} = require('../models')

class Controller {

    static viewAll(req, res) {
        Todo.findAll()
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(err))
    }

    static viewOne(req, res) {
        let id = req.params.id
        let option = { where: { id: id } }

        Todo.findOne(option)
        .then(data => {
            if (data) {
                res.status(200).json(data)
            } else {
                throw ('Error 404: Not found')
            }
        })
        .catch(err => {
            if (err) {
                res.status(404).json(err)
            } else {
                res.status(500)
            }
        })
    }

    static add(req, res) {
        let obj = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
        }
        Todo.create(obj)
        .then(data => res.status(201).json(data))
        .catch(err => res.status(400).json(err))
    }

    static edit(req, res) {
        let id = req.params.id
        let option = { where: { id: id } }
        let obj = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
        }

        Todo.update(obj, option)
        .then(success => {
            if (success[0]) {
                res.status(200).json(obj)
            } else {
                res.status(404).json('Error 404: Not found')
            }    
        })
        .catch(err => {
            if (err) {
                res.status(400).json(err)
            } else {
                res.status(500)
            }
        })
    }

    static delete(req, res) {
        let id = req.params.id
        let option = { where: { id: id } }

        Todo.findOne(option)
        .then(data => {
            if (data) {
                Todo.destroy(option)
                .then(() => res.status(200).json(data))  
            } else {
                res.status(404).json('Error 404: Not found')
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
}

module.exports = Controller