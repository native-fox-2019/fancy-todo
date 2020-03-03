const bcrypt = require('bcrypt')
const { Todo } = require('../models')

function authorization(req, res, next) {
    Todo
        .findOne({ where: { id: Number(req.params.id) } })
        .then(data => {
            console.log(data.UserId)
            if(data){
                if (req.user.id === data.UserId) {
            // console.log('masuk', req.user.id)
            next()
                } else {
                    throw {
                        status: 403,
                        msg: 'forbidden'
                    }
                }
            } else {
                throw {
                    status:404,
                    msg:'Not Found'
                }
            }
        })
        .catch(err=>{
            next(err)
        })

}

module.exports = authorization