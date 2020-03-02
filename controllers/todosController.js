const Model = require(`../models`)

class TodosController {

    static create(req, res, next) {
        Model.Todolist.create(req.body)
            .then(data => {
                res.status(201).json(data)
                                                // if(data < 1) {
                                                //     throw {
                                                //         code: 404,
                                                //         msg: `id gk ketemu`
                                                //     }
                                                // }
            })
            .catch(err => {
                next(err)
            })
    }

}

module.exports = TodosController