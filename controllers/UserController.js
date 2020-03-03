const model = require('../models');
const User = model.User;
const bcrypt = require('bcrypt');

class UserController{
    static register(req, res, next){
        const email = req.body.email;
        const password = req.body.password;
        User.create({
            email: email,
            password: password
        })
            .then(data => res.status(301).json(data))
            .catch(error => next(error));
    }
    static login(req, res, next){
        const email = req.body.email;
        const password = req.body.password;
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        User.findOne({ where: {email}})
        .then(data=>{
            if(data){
                if(bcrypt.compareSync(data.password, hash)){
                    let token = jwt.sign({email: User.email}, process.env.JWT_SECRET);
                    res.status(200).json({token})
                }else{
                    next(err);
                }
            }
            else{
                next(err);
            }
        })
    }
}

module.exports = UserController;