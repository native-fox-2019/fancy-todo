const Router = require ('express').Router()
const Controller = require('../controller/cont_user')


Router.post('/register',Controller.register)
Router.post('/glSign',Controller.googleSignIn)
Router.post('/login',Controller.login)

module.exports=Router


