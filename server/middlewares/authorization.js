const { User } = require('../models');

function authorization(req, res, next){
    User.findOne({
        where: {
            id: req.userData.id
        }
    })
        .then(data=>{
            if(!data.id){
                next({
                    msg: 'error not found'
                })
            }else{
                next()
            }
        })
        .catch(err=>{
            next(err);
        })
}

module.exports = authorization;