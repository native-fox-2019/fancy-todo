const {Todo} = require('../models');

function authorization(req, res, next){
    Todo.findOne({
        where: {
            userId: req.userData.id
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
            next(err)
        })
}

module.exports = authorization;