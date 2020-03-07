const { User } = require('../models');
const jwt = require('jsonwebtoken');


const CLIENT_ID = "91945127163-61ared22mukbbrt2ii4l17arkocufe9h.apps.googleusercontent.com"

const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(CLIENT_ID);


class Controller{
    static register(req, res, next){
        let dataRegis = {
            email: req.body.email,
            password: req.body.password
        }

        User.create(dataRegis)
            .then(data=>{
                res.status(201).json(dataRegis);
            })
            .catch(err=>{
                next(err);
            })
    }

    static googleLogin(req, res, next){
        
        let emailGoogle;

        client.verifyIdToken({
            idToken: req.body.token,
            audience: CLIENT_ID,
        })
            .then(ticket=>{
                emailGoogle = ticket.payload.email;

                return User.findOne({
                    where: {
                        email: emailGoogle
                    }
                })
            })
            .then(data=>{
                let dataCreate = {
                    email: emailGoogle,
                    password: '12345'
                }
                
                if(!data){
                    return User.create(dataCreate)
                }else{
                    return data;
                }
            })
            .then(data=>{
                let token = jwt.sign({
                    id: data.id,
                    email: data.email
                }, process.env.SECRET)

                console.log(token)
                res.status(200).json(token);
            })
            .catch(err=>{
                next(err)
            })
    }

    static login(req, res, next){
       
        User.findOne({
            where: {
                email: req.body.email
            }
        })
            .then(user=>{
                if(req.body.password === user.password){
                    let token = jwt.sign({
                        id: user.id,
                        email: user.email
                    }, process.env.SECRET)

                    res.status(200).json(token);
                }else{
                    next({
                        msg: 'wrong password'
                    })
                }
            })
            .catch(err=>{
                next(err);
            })
    }
}

module.exports = Controller;