
const { Todo } = require('../models/index')

class TodoControl {

    static show(req, res){
        Todo.findAll()
        // .then(data=>res.status(200).json(data))
        .then(data=>res.status(200).json({"status": 200, "response": data}))
        .catch(e=>res.status(500).json({"status": 500, "response": e}))
    }

    static find(req, res){
        let searchId = req.params.id
        Todo.findByPk(searchId)
        .then(data=>{
            if (data!==null){
                res.status(200).json({"status": 200, "response": data})
            } else {
                res.status(404).json({"status": 404, "response": "data not found"})
            }
        })
        .catch(e=>res.status(500)({"status": 500, "response": e}))
    }

    static create(req, res){
        console.log(req.body)
        // let {title, description, status, due_date, userId} = req.body
        // let data = {title, description, status, due_date, userId}
        // console.log(data)
        Todo.create(req.body)
        .then(data=>{
            if(data){
                res.status(201).json({"status": 201, "response": `new data ${req.body} has been saved`})
            } else {
                res.status(400).json({"status": 400, "response": e.message})
            }
        })
        .catch(e=>res.status(500).json({"status": 500, "response": e.message}))
    }

    static edit(req, res){
        let searchId = req.params.id
        Todo.update(req.body, {
            where: {id: searchId}
        })
        .then(data=>res.status(200).json({"status": 200, "response": `edit with new data ${req.body} has been done`}))
        .catch(e=>res.status(500).json({"status": 500, "response": e.message}))
    }

    static delete(req, res){
        let searchId =  req.params.id
        Todo.destroy({
            where : { id: searchId}
        })
        .then(data=>{
            if(data!==0){
                res.status(200).json({"status": 200, "response": `data with id ${searchId} has been deleted`})
            } else {
                res.status(404).json({"status": 404, "response": "no data is deleted"})
            }
        })
        .catch(e=> res.status(500).json({"status": 500, "response":e} ))
    }

}

module.exports = TodoControl