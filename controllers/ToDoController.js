const models = require('../models');
const ToDo = models.ToDo;
const createError = require("http-errors");

/**
 * @swagger
 * tags:
 *  name: ToDo
 *  description: ToDo management
 */
class ToDoController{
    /**
     * @swagger
     * path:
     *  /todos/:
     *    get:
     *      summary: Get all todos
     *      tags: [ToDo]
     *      responses:
     *        "200":
     *          description: Array of ToDo
     *          content:
     *            application/json:
     *              schema:
     *                type: array
     *                items:
     *                  $ref: "#/components/schemas/ToDo"
     *        "500":
     *          description: Internal Server Error
     */
    static getTodos(req, res, next){
        ToDo.findAll()
            .then(data => res.status(200).json(data))
            .catch(err => next(err));
    }
    static getTodo(req, res, next){
        const id = req.params.id
        ToDo.findByPk(id)
            .then(data=> {
                if (data !== null) {
                    res.status(200).json(data)
                } else {
                    next({ name: "NotFound" });
                }
            })
            .catch(err => {
                next(err);
            });
    }
    static addTodo(req, res, next){
        const title = req.body.title;
        const description = req.body.description;
        const status = req.body.status;
        const due_date = req.body.due_date;
        ToDo.create({
            title: title,
            description: description,
            status: status,
            due_date: due_date
        })
            .then(data => res.status(201).json(data))
            .catch(err => {
                //res.send(err);
                next(err);
            })
    }
    static updateTodo(req, res){
        const id = req.params.id;
        const newData = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }
        let option = {
            where: {id:id}
        }
        ToDo.update(newData, option)
            .then(data => res.status(201).json(data))
            .catch(err => res.status(404).json(err))

        // ToDo.findByPk(id)
        //     .then(data => {
        //         data.title = req.body.title;
        //         data.description = req.body.description;
        //         data.status = req.body.status;
        //         data.due_date = req.body.due_date;
        //         return data.save();
        //     })
        //     .then(data => res.status(201).json(data))
        //     .catch(err => res.status(404).json(err));
    }
    static deleteTodo(req, res){
        const id = req.params.id;
        let option = {
            where: {id:id}
        }
        ToDo.destroy(option)
            .then(data => res.status(202).json(data))
            .catch(err => res.status(500))
    }
}

module.exports = ToDoController;