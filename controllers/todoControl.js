
const { Todo } = require('../models/index')

class TodoControl {

    static show(req, res){
        Todo.findAll()
        // .then(data=>res.status(200).json(data))
        .then(data=>res.send({"status": 200, "response": data}))
        .catch(e=>res.send({"status": 500, "response": e}))
    }

    static find(req, res){
        let searchId = req.params.id
        Todo.findByPk(searchId)
        .then(data=>{
            if (data!==null){
                res.send({"status": 200, "response": data})
            } else {
                res.send({"status": 404, "response": "data not found"})
            }
        })
        .catch(e=>res.send({"status": 500, "response": e}))
    }

    static create(req, res){
        Todo.create(req.body)
        // .then(data=>res.status(201).json(data))
        .then(data=>res.send({"status": 201, "response": data}))
        .catch(e=>res.send({"status": 400, "response": e.message}))
    }

    static edit(req, res){
        let searchId = req.params.id
        Todo.update(req.body, {
            where: {id: searchId}
        })
        .then(data=>res.send({"status": 200, "response": data}))
        .catch(e=>res.send({"status": 404, "response": e.message}))
    }

    static delete(req, res){
        let searchId =  req.params.id
        Todo.destroy({
            where : { id: searchId}
        })
        .then(data=>{
            if(data!==0){
                res.send({"status": 200, "response": `data with id ${searchId} has been deleted`})
            } else {
                res.send({"status": 404, "response": "no data is deleted"})
            }
        })
        .catch(e=> res.send({"status": 500, "response":e} ))
    }

}

module.exports = TodoControl