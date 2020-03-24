"use strict"
const {Task} = require('../models')

function authorization(req, res, next) {
    let id = req.params.id
    let option = {
        where: {id:id}
    }
    Task.findOne(option)
    .then(data => {
        if (data) {
            // console.log(data)
            // console.log(data.UserId)
            // console.log(req.userData)
            // console.log(req.userData.id)
            if (data.UserId === req.userData.id) {
                next()
            } else {
                throw { status: 400, message: 'Not authorized' }
            }
        } else {
            throw { status: 404, message: 'Data not found' }
        }
    })
    .catch(err => next(err))
}

module.exports = authorization