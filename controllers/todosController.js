const Model = require(`../models`)

class TodosController {

    static create(req, res) {
        Model.Todolist.create(req.body)
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                var errMsg = []

                err.errors.forEach(i => {
                    errMsg.push(i.message)
                })

                res.status(400).json(errMsg)
            })
    }

}

module.exports = TodosController