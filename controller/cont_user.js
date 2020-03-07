const { User } = require('../models')
const comparePw = require('../helper/compare_pw')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GCLIENT);




class UserController{

    static googleSignIn(request,response,next){
        // console.log('token google',token)
        let Gltoken = request.body.token
        let user=null
        client.verifyIdToken({
            idToken:Gltoken,
            audience:process.env.GCLIENT
        })
        .then(ticket=>{
            const payload=ticket.getPayload();
            console.log(payload,'<<<<<<<<<<<<<<< korewa payload')
            user={
                name:payload.name,
                email:payload.email,
                password:'12345'
            }
            return User.findOne({where:{email:user.email}})
        })
        .then(data=>{
            if(data){
                return data
            }else{
                let receipient=user.email
                let nama=user.name
                let msg=`selamat datang ${user.name}, password anda adalah ${user.password}`
                
                return User.create(user)
            }
        })
        .then(data=>{
            let token=jwt.sign({id:data.id,email:data.email},process.env.SECRET)
            response.status(200).json({token})
        })
        .catch(err=>{
            console.log('glsign error')
            next(err)
        })
    }


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
    
                        response.status(201).json({token})
                    }else{
                        let obj={
                            status:404,
                            msg:"User / Password Wrong"
                        }
                        console.log(obj,"tessssssssssssssssssssss   ")
                        throw obj
                    }

                })
                .catch(err=>{
                    next(err)
                })
            }else{
                let obj={status:404,
                    msg:"user/pw salah (user not exist) dari resultlogin"
                }
                throw obj
            }
            
        })
        .catch(err =>{
            console.log(err)
            next(err)
        })
    }
}

module.exports=UserController