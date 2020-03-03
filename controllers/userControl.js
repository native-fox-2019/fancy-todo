const { User } = require('../models/index')
const jwt = require('jsonwebtoken')

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
            where: { email: email}
        })
        .then(user=>{
            if(user){
                if (password === user.password){
                    let token = jwt.sign({email: user.email}, 'aaa')
                    res.status(200).json({token})
                } else {
                    res.status(400).json({"status":400, "response": 'email/password wrong'})
                }
            }
        })
    }

}

module.exports = UserControl