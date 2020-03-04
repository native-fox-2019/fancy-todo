const jwt = require('../helpers/jwt.js');
const models = require('../models');
const User = models.User;

module.exports = (req, res, next) => {
    let decodedToken;
    try {
        const token = req.headers.authorization;
        decodedToken = jwt.verify(token);
    } catch {
        next ({
            status: 401,
            message: "Unauthorized"
        });
        return;
    }
    User.findOne({
        where: {
            email: decodedToken.email
        }
    })
        .then(user=>{
            if(user){
                req.user = user;
                next();
            }
            else{
                next({
                    status: 401,
                    message: "Unauthorized"
                })
            }
        })
        .catch(err => {
            next(err);
        });

};