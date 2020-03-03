const { User } = require('../models')
const comparePw = require('../helper/compare_pw')
const jwt = require('jsonwebtoken')
require('dotenv').config()


class UserController{
    static register(request,response,next){
        User.create(
            {
                name:request.body.name,
                email: request.body.email,
                password:request.body.password
            }
        )
        .then(result=>{
            let obj={
                message:"Sukses Register"
            }
            response.status(201).json(obj)
        })
        .catch(err=>{
            response.status(404).json(err)
        })
    }

    static login(request,response,next){
        User.findOne({where:{email:request.body.email}})
        .then (result=>{
            if (result){
                let isMatch = comparePw(request.body.password, result.password)
                .then(match=>{
                    if (match){
                        let token = jwt.sign(
                            { id:result.id,
                                email:result.email
                            },process.env.SECRET)
    
                        response.status(201).json(token)
                    }else{
                        response.status(404).json({
                            msg:"user/pwsalah dari comparePw"
                        })
                    }

                })
            }else{
                let obj={
                    msg:"user/pw salah (user not exist) dari resultlogin"
                }
                response.status(404).json(obj)
            }
            
        })
    }
}

module.exports=UserController