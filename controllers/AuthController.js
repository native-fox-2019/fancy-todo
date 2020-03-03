const {User}=require('../models');
const jwt=require('jsonwebtoken');

class AuthController{

    static login(req,res,next){
        (async function(){
            let body=req.body;
            let secret=process.env.JWT_SECRET || 'hehehe'

            try{
                let user=await User.findOne({where:{
                    email:body.email,
                    password:body.password}
                });
                if(user){
                    let token = jwt.sign(user.tokenvalue, secret);
                    res.status(200).json({user,token});
                }
                else{
                    res.status(404).json({status:404,message:'username/password is wrong'});
                }

            }catch(err){
                res.status(500).json({status:500,err});
            }
        })();
    }

    static register(req,res,next){
        (async function(){
            let body=req.body;
            let secret=process.env.JWT_SECRET || 'hehehe';
            try{
                let user=await User.create(body);
                res.status(201).json(user);
            }catch(err){
                next(err);
            }

        })();

    }
}

module.exports=AuthController;