const { User } = require('../models/index.js')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config()
const errHandler = require('../middleware/errorHandler.js')

class userController{

    static register(req,res,next){
        
        let obj = {
            firstname : req.body.firstname,
            lastname : req.body.lastname,
            email : req.body.email,
            password : req.body.password
        }
        console.log(obj)
        User.create(obj)

        .then(result=>{
            res.status(201).json(result)
        })
        .catch(err=>{
            next({status: 500, msg: 'Internal server error!'})
        })
    }

    static login(req,res,next){
        let email = req.body.email
        let password = req.body.password
        User.findOne({where:{email:email}})
        .then(user=>{
            return bcrypt.compare(password, user.password)
            .then(result =>{
                if(result === true){
                    let token = jwt.sign({email:user.email,id:user.id},process.env.JWT_SECRET)
                    res.status(200).json({ token })
                } else{
                    next({status: 400, msg: 'wrong username/password!'})
                }
            })
        })
        .catch(err=>{
            next({status: 500, msg: 'Internal server error!'})
        })
    }


    static googleLogin(req,res,next){
        let email = null;
        client.verifyIdToken({
            idToken : req.body.token,
            audience : "134915435588-5qke74m4j5s24kbrksevrhpc1pq3ulsg.apps.googleusercontent.com"
        })
        .then(ticket=>{
            email = ticket.getPayload().email
            return User.findOne({where:{email : email }})
        })
        .then(data=>{
            if(data){
              return data
            } else{
                return User.create({
                    firstname : email,
                    lastname : email,
                    email : email,
                    password : "default"
                })
            }
        })
        .then(data=>{
            let token = jwt.sign({id:data.id,email:data.email}, process.env.JWT_SECRET)
            res.status(201).json({token})
        })
        .catch(err=>{
            next(err)
        })
    }
}

module.exports = userController