const { Todo } = require('../models');
const jwt = require('jsonwebtoken');

class Controller{
    
    static addData(req, res, next){
        
        let dataAdd = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
            userId: req.userData.id
        }
        
        Todo.create(dataAdd)
            .then(data=>{
                res.status(201).json(dataAdd);
                
            })
            .catch(err=>{
                next(err);
            })
        
    }

    static showData(req, res, next){
        Todo.findAll()
            .then(data=>{
                res.status(200).json(data);
            })
            .catch(err=>{
                next(err);
            })
    }

    static showDataById(req, res, next){
        Todo.findOne({
            where: {
                id: req.params.id
            }
        })
            .then(data=>{
                if(!data){
                    next({
                        msg: 'error not found'
                    })
                }else{
                    res.status(200).json(data);
                }
            })
            .catch(err=>{
                res.status(404).json(err.message);
            })
    }

    static edit(req, res, next){
        let dataEdit = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date 
        }

        Todo.update(dataEdit, {
            where: {
                userId: req.userData.id,
                id: Number(req.params.id)
            }
        })
            .then(data=>{
                if(data[0] === 0){
                    next({
                        msg: 'error not found'
                    })
                }else{
                    res.status(200).json(dataEdit);
                }
                
            })
            .catch(err=>{
                next(err);
            })
    }

    static deleteData(req, res, next){
        let dataDelete;
        
        Todo.findOne({
            where: {
                id: req.params.id
            }
        })
            .then(data=>{  
                dataDelete = data; 

                return Todo.destroy({
                    where: {
                        id: req.params.id
                    }
                })
                
            })
            .then(data=>{
                if(data === 0){
                    next({
                        msg: 'error not found'
                    })
                }else{
                    res.status(200).json(dataDelete);
                }
            })
            .catch(err=>{
                next(err);
            })
    }
}

module.exports = Controller;