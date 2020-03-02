const { Todo } = require('../models')

class todoController {

    static add(req, res) {
        console.log(req.body)
        let obj = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }
        Todo.create(obj)
            .then(data => {
                res.status(201).json(data)
            }).catch(err => {
                next(err)
            })
    }

    static showAll(req, res) {
        Todo.findAll()
            .then(data => {
                res.status(200).json(data)
            }).catch(err => {
                res.status(500).json(err)
            })
    }

    static showOne(req, res) {
        let id = {
            where: {
                id: req.params.id
            }
        }

        Todo.findOne(id)
            .then(data => {
                res.status(200).json(data)
            }).catch(err => {
                next(err)
            })
    }

    static delete(req, res) {
        let id = {
            where: {
                id: req.params.id
            }
        }
       
        let dataResult = null
        Todo.findOne(id)
            .then(data => {
                dataResult=data
                return Todo.destroy(id)        
            })
            .then(data =>{
                if(data < 1){
                    throw{
                        code: 404,
                        msg: `Data tidak ditemukan`
                    }
                }
                res.status(200).json(dataResult)
            })
            .catch(err => {
                next(err)
            })
    }

    static edit(req, res) {
        let id = {
            where: {
                id: req.params.id
            }
        }
        let obj ={
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }

        Todo.update(obj,id)
        .then(data=>{
            if(data < 1){
                throw{
                    code:404,
                    msg:`data tidak ditemukan`
                }
            }
            return Todo.findOne(id)
        }).then(data =>{
               
             res.status(200).json(data)   
        }).catch(err => {  
            next(err)
        })
    }

}

module.exports = todoController