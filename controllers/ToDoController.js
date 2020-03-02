const models = require('../models');
const ToDo = models.ToDo;

class ToDoController{
    static show(req, res){
        ToDo.findAll()
            .then(data => res.status(200).json(data))
            .catch(err => res.status(500));
    }
    static add(req, res){
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
            .catch(err => res.status(404).json(err))
    }
    static edit(req, res){
        const id = req.params.id;
        let option = {
            where: {id:id}
        }
        ToDo.update(req.body, option)
            .then(data => res.status(201).json(data))
            .catch(err => res.status(404).json(err))
    }
    static delete(req, res){
        const id = req.params.id;
        let option = {
            where: {id:id}
        }
        ToDo.destroy(option)
            .then(data => res.status(201).json(data))
            .catch(err => res.status(500))
    }
}

module.exports = ToDoController;