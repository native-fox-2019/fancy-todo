
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
        console.log("====")
        console.log(req.userdata)
        let newData = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
            userId: req.userdata.id
        }
        Todo.create(newData)
        .then(data=>res.status(201).json({"status": 201, "response": `new data : ${data.title} has been saved`}))//{
        .catch(e=>{
            if(e.name ="SequelizeValidationError"){
                res.status(400).json({"status": 400, "response": e.message})
            } else {
                res.status(500).json({"status": 500, "response": e})
            }
        })
    }

    static edit(req, res){
        let searchId = req.params.id
        console.log(req.body)
        console.log('=====')
        console.log(req.userdata)
        Todo.update(req.body, {
            where: {id: searchId}
        })
        .then(data=>{
            console.log(data)
            //if(data){
                res.status(200).json({"status": 200, "response": `data with id : ${searchId} has been updated`})
            // } else {
            //     res.status(404).json({"status": 404, "response": "data not found"})
            // }
        })  
        .catch(e=>{
            if(e.name ="SequelizeValidationError"){
                res.status(400).json({"status": 400, "response": e.message})
            } else {
                res.status(500).json({"status": 500, "response": e})
            }
        })
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