const { Todo } = require(`../models`)

class TodoController {

    static getAll (req, res, next) {
        Todo.findAll({where:{user_id:req.userData.id}})
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            next(err)
        })
    }

    static create (req, res, next) {
        let newTodo = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
            user_id: req.userData.id
        }

        Todo.create(newTodo)
        .then(data => {
            res.status(201).json(newTodo)
        })
        .catch(err => {
            next(err)
        })
    
    }

    static find (req, res, next) {
        let todoId = req.params.id
        Todo.findOne({where:{id:todoId}})
        .then(data => {
            if(data != null) {
                res.status(200).json(data)
            } else {
                let error = `ID cannot be found`
                throw error
            }
        })
        .catch(err => {
            next(err)
        })
    }

    static update (req, res, next) {
        let todoId = req.params.id
        let updateTodo = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }

        Todo.update(updateTodo,{where:{id:todoId}})
        .then(data => {
            console.log(data)
            if (data[0] == 0) {
                next({
                    status:404,
                    msg:`Cannot be found`
                })
            } else {
                res.status(200).json(updateTodo)
            }
        })
        .catch(err => {
            next(err)
        })
    }

    static delete (req, res, next) {
        console.log(`masuk delete controller`)
        let todoId = req.params.id
        let deletedTodo = null
        Todo.findByPk(todoId)
        .then(data => {
            // console.log(data)
            if(data == null) {
                let error = `ID cannot be found`
                throw error
            } else {
                deletedTodo = data
                return Todo.destroy({where:{id:todoId}})
            }
        })
        .then(data => {
            res.status(200).json(deletedTodo)
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = TodoController