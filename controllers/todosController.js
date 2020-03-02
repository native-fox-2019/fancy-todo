const { Todo } = require('../models');

class Controller{
    static addData(req, res){
        let dataAdd = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }
        
        Todo.create(dataAdd)
            .then(data=>{
                res.status(201).json(dataAdd);
                
            })
            .catch(err=>{
                if(err.name === 'SequelizeValidationError'){
                    res.status(400).json(err.message);
                }else{
                    res.status(400).json(err);
                }
            })
        
    }

    static showData(req,res){
        Todo.findAll()
            .then(data=>{
                res.status(200).json(data);
            })
            .catch(err=>{
                res.status(500).json(err);
            })
    }

    static showDataById(req, res){
        Todo.findOne({
            where: {
                id: req.params.id
            }
        })
            .then(data=>{
                if(!data){
                    throw new Error('error not found');
                }else{
                    res.status(200).json(data);
                }
            })
            .catch(err=>{
                res.status(404).json(err.message);
            })
    }

    static edit(req, res){
        let dataEdit = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date 
        }

        Todo.update(dataEdit, {
            where: {
                id: req.params.id
            }
        })
            .then(data=>{
                if(data[0] === 0){
                    throw new Error('error not found')
                }else{
                    res.status(200).json(dataEdit);
                }
                
            })
            .catch(err=>{
                if(err.message === 'error not found'){
                    res.status(404).json(err.message);
                }else if(err.name === 'SequelizeValidationError'){
                    res.status(400).json(err.message);
                }else{
                    res.status(500).json(err.message);
                }
            })
    }

    static deleteData(req, res){
        let dataDelete;
        
        Todo.findOne({
            where: {
                id: req.params.id
            }
        })
            .then(data=>{
                if(!data){
                    throw new Error('error not found');
                }else{
                    dataDelete = data; 

                    return Todo.destroy({
                        where: {
                            id: req.params.id
                        }
                    })
                }
            })
            .then(data=>{
                res.status(200).json(dataDelete);
            })
            .catch(err=>{
                if(err.message === 'error not found'){
                    res.status(404).json(err.message);
                }else{
                    res.status(500).json(err);
                }
            })
    }
}

module.exports = Controller;