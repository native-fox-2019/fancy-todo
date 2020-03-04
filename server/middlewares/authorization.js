const jwt = require('jsonwebtoken');
const { Todo } = require('../models')
const decode = require('../helpers/decode')
 
module.exports = (req,res,next) => {
  let id = Number(req.params.id)
  const userData = decode(req.headers.usertoken)
  Todo.findOne({
    where: {
      id
    }
  })
  .then(data => {
    if(!data){
      next({
        status:404,
        message:'Todo not found'
      })
    }else{
      if(Number(userData.id) === Number(data.userId)){
        next()
      }else{
        next({
          status:401,
          message:'Forbidden Access'
        })
      } 
    }
  })
  .catch(err => {
    next(err)
  })
}