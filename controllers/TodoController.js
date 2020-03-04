const {Todo,User}=require('../models');
const jwt=require('jsonwebtoken');

class TodoController{

    static index(req,res,next){
        (async function(){
            let result;
            let {token}=req.headers;
            let decoded =User.validateToken(token);
            try{
                result=await Todo.findAll({
                    where:{userId:decoded.id},
                    include:User,
                    order:['id']
                });
            }catch(err){
                next(err);
                return;
            }
            res.status(200).json(result);

        })();
    }

    static create(req,res,next){
        (async function(){

            let body=req.body;
            let result;
            let {token}=req.headers;

            try{
                let decoded =User.validateToken(token);
                body.userId=decoded.id;
                result=await Todo.create(body);
            }catch(err){
                next(err);
                return;
            }

            res.status(201).json(result)

        })();
    }

    static fetchById(req,res,next){
        (async function(){

            let id=req.params.id;
            let result;
            let {token}=req.headers;
            let decoded =User.validateToken(token);

            try{
                result=await Todo.findOne({where:{id},include:User});
                if(decoded.id!==result.userId){
                    res.status(401).json({status:401,message:'Unauthenticated'});
                    return;
                }
            }catch(err){
                next(err);
                return;
            }

            if(result)
                res.status(200).json(result);
            else
                res.status(404).json({status:404,message:'Data tidak ditemukan'});

        })();
    }

    static update(req,res,next){
        (async function(){
            
            let id=req.params.id;
            let result;
            let body=req.body;
            let curr;
            let {token}=req.headers;
            let decoded =User.validateToken(token);
            // body.userId=decoded.id;

            try{
                curr=await Todo.findOne({where:{id}});
                if(curr.userId !==decoded.id ){
                    res.send(401).json({status:401,message:'Unaunthenticated'});
                    return;
                }

                result=await Todo.update(body,{where:{id}});
            }catch(err){
                next(err);
                return;
            }

            let status=result[0];
            if(status===1){
                let curr=await Todo.findOne({where:{id}});
                res.status(200).json({data:curr,status:200});
            }else{
                res.status(404).json({message:'Data tidak ditemukan',status:404});
            }

        })();
    }

    static delete(req,res){
        (async function(){
            let id=req.params.id;
            let result,curr;
            let {token}=req.headers;
            let decoded =User.validateToken(token);

            try{
                curr=await Todo.findOne({where:{id}});
                if(curr.userId !==decoded.id ){
                    res.send(401).json({status:401,message:'Unaunthenticated'});
                    return;
                }
                result=await Todo.destroy({where:{id}});
            }catch(err){
                res.status(404).json({status:404,message:'Data tidak ditemukan',result});
                return;
            }
                res.status(200).json({status:200,message:'Data berhasil dihapus',result});
          

        })();
    }

}

module.exports=TodoController;