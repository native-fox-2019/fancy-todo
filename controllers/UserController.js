const model = require('../models');
const User = model.User;
const Bcrypt = require('../helpers/bcrypt.js');

class UserController{
    static register(req, res, next){
        const email = req.body.email;
        const password = req.body.password;
        User.create({
            email: email,
            password: password
        })
            .then(data => res.status(201).json(data))
            .catch(next);
    }
    static login(req, res, next){
        const email = req.body.email;
        const password = req.body.password;
        User.findOne({ where: {email}})
        .then(data=>{
            if(data){
                if(Bcrypt.compareSync(password, data.password)){
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