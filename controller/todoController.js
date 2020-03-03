const { Todo } = require('../models/index.js')
const axios = require('axios')


class TodoController{
    static view(req,res,next){
        Todo.findAll({where:{userId : req.userData.id}})
        .then(result=>{
            res.status(200).json(result)
        })
        .catch(err=>{
            next({status: 500, msg: 'Internal server error!'})
        })
    }

    static add(req,res,next){
        let obj = {
            title : req.body.title,
            description : req.body.description,
            status : req.body.status,
            due_date : req.body.due_date,
            userId : req.userData.id
        }
        console.log(req.userData.id)
        Todo.create(obj)
        .then(result=>{
            res.status(201).json(result)
        })
        .catch(err=>{
            if(err){
               let totalError = {}
            for(let i = 0; i < err.errors.length; i++){
                totalError[err.errors[i].path] = {
                    msg : err.errors[i].message
                }
            } 
            next({status: 400, msg: totalError})
            } else{
            next({status: 500, msg: 'Internal server error!'})
            }
        })
    }

    static getTodo(req,res,next){
        let params = req.params.id
        console.log(req.params.id)
        Todo.findOne({where:{id:params}})
        .then(result=>{
            if(result){
              res.status(200).json(result)  
            } else{
                 next({status: 404, msg: 'Data not found!'})
            }
            
        })
        .catch(err=>{
            next({status: 500, msg: 'Internal server error!'})
        })
    }

    static update(req,res,next){
        let params = Number(req.params.id)
        let obj = {
            title : req.body.title,
            description : req.body.description,
            status : req.body.status,
            due_date : req.body.due_date
        }

        Todo.update(obj,{where:{id:params}})
        .then(result=>{
            if(result[0]){
              res.status(200).json(obj)  
            }
            else{
             next({status: 404, msg: 'Data not found!'})  
            }
        })
        .catch(err=>{
          res.status(400).json(err)  
        })
    }

    static delete(req,res,next){
        let params = req.params.id
        let todo = null
        Todo.findByPk(params)
        .then(result=>{
            if(result){
            todo = result;
            return Todo.destroy({where:{id:params}})
            } else{
                next({status: 404, msg: 'Data not found!'})
            }
        })
        .then(data=>{
             res.status(200).json(todo)  
        })
        .catch(err=>{
            next({status: 500, msg: 'Internal server error!'})
        })
    }

    static getQuotes(req,res){
        axios({
            method: 'get',
            url : 'http://quotes.stormconsultancy.co.uk/random.json'
        })
        .then((response) =>{
            res.status(200).json({"quotes" : response.data.quote})
        })
        .catch(err=>{
            res.status(500).json('error!')
        })
    }

    static getWeather(req,res){
        axios({
            method: 'get',
            url : 'http://api.airvisual.com/v2/nearest_city?key=971d601f-a933-433f-a8fe-cfa789dbd7de'
        })
        .then((response) =>{
            res.status(200).json({"quotes" : response.data})
        })
        .catch(err=>{
            res.status(500).json('error!')
        })
    }


}

module.exports = TodoController