const { User } = require('../models/index')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

class UserControl {

    static register(req, res){
        User.findOne({
            where: {email:req.body.email}
        })
        .then(data=>{
            if(data){
                res.send("your e-mail has been registered")
            } else {
                User.create(req.body)
                .then(data=>res.status(201).json({"status": 201, "response":data}))
            }
        })   
        .catch(e=>res.status(400).json({"status": 400, "response":e}))
    }

    static login(req, res){
        let { email, password } = req.body
        User.findOne({
            where: { email }
        })
        .then(user=>{
            if(user){
                if (bcrypt.compareSync(password, user.password)){
                    let token = jwt.sign({id: user.id, email: user.email}, process.env.JWT_SECRET)
                    res.status(200).json({token})
                } else {
                    res.status(400).json({"status":400, "response": 'password wrong'})
                }
            } else{
                res.status(400).json({"status":400, "response": 'email wrong'})
            }
        })
        .catch(e => res.status(500).json({"status": 500, "response": e}))
    }

    static googleLogin(req, res){
        console.log('masuk')
        client.verifyIdToken({
            idToken: req.body.id_token,
            audience: process.env.CLIENT, // Specify the CLIENT_ID of the app that accesses the backend
                // Or, if multiple clients access the backend:
                //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
            })
            .then(ticket => {
                const payload = ticket.getPayload();
                User.findOne({
                    where: {
                        email: payload.email
                    }
                })
                    .then(data => {
                        if (data) {
                            return data
                        }
                        else {
                            let obj = {
                                email: payload.email,
                                password: "google"
                            }
                            return User.create(obj)
                        }
                    })
                    .then(data => {
                        if (data) {
                            var token = jwt.sign({id: data.id, email: data.email}, process.env.JWT_SECRET)
                        }
                        res.status(200).json({ token: token })
                    })
                    .catch(err => {
                        res.send(err)
                    })
            })
        }

}
    
module.exports = UserControl