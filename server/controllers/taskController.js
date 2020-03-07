"use strict"

const {Task} = require('../models')
const axios = require('axios')

class Controller {

    static list(req, res, next) {
        let option = { where: {UserId: req.userData.id} }
        Task.findAll(option)
        .then(data => res.status(200).json(data))
        .catch(err => next(err))
    }

    static add(req, res, next) {
        let obj = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            deadline: req.body.deadline,
            UserId: req.userData.id
        }
        Task.create(obj)
        .then(data => res.status(201).json(data))
        .catch(err => next(err))
    }

    static getOne(req,res,next){
        let id = req.params.id
        Task.findOne({ where: { id: id } })
        .then(result=>{
            if(result){
                res.status(200).json(result)
            } else{
                throw {status: 404, message: 'Data not found'}
            }
        })
        .catch(err=>{
            next(err)
        })
    }

    static edit(req, res, next) {
        console.log('Masuk Edit')
        let id = req.params.id
        let option = { where: { id: id } }
        let obj = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            deadline: req.body.deadline,
            UserId: req.userData.id
        }

        Task.update(obj, option)
        .then(success => {
            if (success[0]) {
                res.status(200).json(obj)
            } else {
                res.status(404).json('Error 404: Not found')
            }    
        })
        .catch(err => {
            if (err) {
                res.status(400).json(err)
            } else {
                res.status(500)
            }
        })
    }

    static delete(req, res, next) {
        let id = req.params.id
        let option = { where: { id: id } }

        Task.findOne(option)
        .then(task => {
            if (task) {
                Task.destroy(option)
                .then(() => res.status(200).json(task))
                .catch(err => next(err))
            } else {
                next(err)
            }
        })
        .catch(err => {
            next(err)
        })
    }

    static getQuote(req, res) {
        console.log('HMM MASUUUUUUUUUK QUOTEEE')
        // Generate random quote //
        axios({
           method: 'GET',
           url: 'https://quote-garden.herokuapp.com/quotes/random',
        })
        .then((response) => {
            res.status(200).json(response.data)
        })
        .catch(err => next(err))
    }
}

module.exports = Controller