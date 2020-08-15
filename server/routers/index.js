"use strict"
const Router = require('express').Router()
const todoRouter = require('./todoRouter')
const userRouter = require('./userRouter')


Router
    .use('/todos', todoRouter)
    .use('/user', userRouter)

module.exports = Router