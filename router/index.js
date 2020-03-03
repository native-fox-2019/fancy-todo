const Router = require ('express').Router()
const RouterTodo = require('./router_todo')
const RouterUser= require('./router_user')
const authenticator = require('../middlewares/authentication')

Router.get('/home' , (request, response)=>{
    response.send('Masuk Home')
})

Router.use('/todos',authenticator,RouterTodo)
Router.use('/users',RouterUser)



module.exports = Router