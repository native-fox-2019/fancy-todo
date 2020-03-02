'use strict'
require('dotenv').config()

const { User, Todo } = require('../models')
const bcrypt = require('bcrypt')
const salt = 10
const authorization = require('../middlewares/authorization')
const jwt = require('jsonwebtoken')

class ControllerUser {

    static register(req, res, next) {
        const { username, password } = req.body
        User
            .create({ username, password })
            .then(data => {
                res.status(200).json({ username, password })
            })
            .catch(err => {
                next(err)
            })
    }

    static login(req, res, next) {
        const { username, password } = req.body;
        User
            .findOne({
                where: {
                    username: username,
                }
            })
            .then(data => {
                console.log(data)
                res.send(data)
                req.UserId = data.id
                const test = bcrypt.compareSync(req.body.password, data.password)
                if(test){
                    const token = jwt.sign({ id: data.id }, process.env.secretCode)
                    res.status(200).json({ 'token': token })
                }
            })
            .catch(err => {
                console.log(err)
                next(err)
            })
    }

    static delete(req,res,next){
        let id = Number(req.params.id)
        User
        .destroy({where:{id:id}})
        .then(data=>{
            console.log(data)
        })
        .catch(err=>{
            console.log(err)
        })
    }
}

module.exports = ControllerUser