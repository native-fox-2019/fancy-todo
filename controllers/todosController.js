const Model = require(`../models`)

class TodosController {

    static create(req, res) {
        Model.Todolist.create(req.body)
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                res.status(400).json(err)
            })
    }

}

module.exports = TodosController