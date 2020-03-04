const { User } = require('../models/index')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

class UserControl {

    static register(req, res){
        console.log(req.body)
        User.create(req.body)
        .then(data=>res.status(201).json({"status": 201, "response":data}))
        .catch(e=>res.status(400).json({"status": 400, "response":e}))
    }

    static login(req, res){
        console.log(req.body)
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

}

module.exports = UserControl