
const { Todo } = require('../models')

class TodoControl {

    static show(req, res){
        Todo.findAll()
        .then(data=>res.send({"status": 200, "response": data}))
        .catch(e=>res.send({"status": 500, "response": e}))
    }

    static find(req, res){
        let searchId = req.params.id
        Todo.findByPk(searchId)
        .then(data=>res.send({"status": 200, "response": data}))
        .catch(e=>res.send({"status": 404, "response": e}))
    }

    static create(req, res){
        Todo.create(req.body)
        .then(data=>res.status(200).json(data))
        .catch(e=>res.status(404).json(e))
    }

    static edit(req, res){
        let searchId = req.params.id
        Todo.update(req.body, {
            where: {id: searchId}
        })
        .then(data=>res.status(200).json(data))
        .catch(e=>res.status(404).json(e))
    }

    static delete(req, res){
        let searchId =  req.params.id
        Todo.destroy({
            where : { id: searchId}
        })
        .then(data=>res.status(200).json({message: `data with id ${searchId} has been deleted`}))
        .catch(e=> res.status(404).json(e))
    }

}

module.exports = TodoControl