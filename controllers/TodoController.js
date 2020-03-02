const {Todo}=require('../models');

class TodoController{

    static index(req,res){
        (async function(){
            let result;

            try{
                result=await Todo.findAll();
            }catch(err){
                res.send(500).json(err);
                return;
            }
            res.status(200).json(result);

        })();
    }

    static create(req,res){
        (async function(){

            let body=req.body;
            let result;
            try{
                result=await Todo.create(body);
            }catch(err){
                res.status(500).json(err);
                return;
            }

            res.status(201).json(result)

        })();
    }

    static fetchById(req,res){
        (async function(){

            let id=req.params.id;
            let result;

            try{
                result=await Todo.findOne({where:{id}});
            }catch(err){
                res.status(500).json(err);
                return;
            }

            if(result)
                res.status(200).json(result);
            else
                res.status(404).json({status:404,message:'Data tidak ditemukan'});

        })();
    }

    static update(req,res){
        (async function(){
            
            let id=req.params.id;
            let result;
            let body=req.body;

            try{
                result=await Todo.update(body,{where:{id}});
            }catch(err){
                res.send(500).json(err);
                return;
            }

            let status=result[0];
            if(status===1){
                let curr=await Todo.findOne({where:{id}});
                res.status(200).json({data:curr,status:404});
            }else{
                res.status(404).json({message:'Data tidak ditemukan',status:200});
            }

        })();
    }

    static delete(req,res){
        (async function(){
            let id=req.params.id;
            let result;

            try{
                result=await Todo.destroy({where:{id}});
            }catch(err){
                res.status(500).json(err);
                return;
            }

            if(result===1)
                res.status(200).json({status:200,message:'Data berhasil dihapus'});
            else
                res.status(404).json({status:404,message:'Data tidak ditemukan'});

        })();
    }

}

module.exports=TodoController;