const { Todo } = require(`../models`)
const sgMail = require('@sendgrid/mail')

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
            sgMail.setApiKey(process.env.SEND_GRID_API_KEY)
            const msg = {
                to: `${req.userData.email}`,
                from: 'test@example.com',
                subject: 'Added new ToDo list',
                text: '1 more thing added',
                html: 
                `<h1>1 More thing added to your ToDo List</h1><br><br>
                <h5>Title</h5>
                <p>${newTodo.title}</p>
                <h5>Description</h5>
                <p>${newTodo.description}</p>
                <h5>Due Date</h5>
                <p>${newTodo.due_date}</p>
                `,
            }
            sgMail.send(msg)
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
                next({
                    status:404,
                    msg:`Cannot be found`
                })
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
            if (data[0] != 0) {
                res.status(200).json(updateTodo)
            }
        })
        .catch(err => {
            next(err)
        })
    }

    static delete (req, res, next) {
        let todoId = req.params.id
        let deletedTodo = null
        Todo.findByPk(todoId)
        .then(data => {
            if(data == null) {
                next({
                    status:404,
                    msg:`Cannot be found`
                })
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

    static testing(req, res, next) {
        
    }
}

module.exports = TodoController