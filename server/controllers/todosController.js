const Model = require(`../models`)
const axios = require(`axios`)
var createError = require('../helpers/createErrors')

class TodosController {

    static create(req, res, next) {
        var { title, description, status, due_date } = req.body
        var obj = {
            title,
            description,
            status,
            due_date,
            UserId: Number(req.user.id)
        }

        Model.Todolist.create(obj)
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                next(err)
            })
    }

    static showAll(req, res, next) {
        Model.Todolist.findAll({
            where: {
                UserId: Number(req.user.id)
            },
            order: [[`due_date`, `ASC`]]
        })
            .then(data => {

                // 7timer weather api
                axios.get(`http://www.7timer.info/bin/civillight.php?lon=106.6&lat=-6.2&ac=0&unit=metric&output=json&tzshift=0`)
                    .then(weather => {
                        var day = weather.data.dataseries

                        day.forEach(i => {
                            i.date = i.date.toString()
                            var date = []

                            date.push(i.date.slice(0, 4))
                            date.push(i.date.slice(4, 6))
                            date.push(i.date.slice(6))

                            i.date = date.join(`-`)
                        })
                        data.forEach(i => {
                            for (var j = 0; j < day.length; j++) {
                                if (day[j].date === i.due_date) {
                                    i.dataValues.forecast = {
                                        temp: day[j].temp2m,
                                        weather: day[j].weather
                                    }
                                    break
                                }
                            }
                        })
                        res.status(200).json(data)
                    })
                    .catch(next)
            })
            .catch(err => {
                next(err)
            })
    }

    static findOne(req, res, next) {
        Model.Todolist.findByPk(Number(req.params.id))
            .then(data => {
                if (data) {
                    res.status(200).json(data)
                } else {
                    throw createError(404, `No Data of ID ${req.params.id} exists`)
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static update(req, res, next) {
        var { title, description, status, due_date } = req.body
        var obj = {
            title,
            description,
            status,
            due_date
        }

        Model.Todolist.update(obj, {
            where: {
                id: Number(req.params.id)
            }
        })
            .then(data => {
                if (data) {
                    Model.Todolist.findByPk(Number(req.params.id))
                        .then(data => {
                            res.status(200).json(data)
                        })
                } else {
                    throw createError(404, `No Data of ID ${req.params.id} exists`)
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static delete(req, res, next) {
        Model.Todolist.findByPk(Number(req.params.id))
            .then(data => {
                if (data) {
                    Model.Todolist.destroy({
                        where: {
                            id: Number(req.params.id)
                        }
                    })

                    res.status(200).json(data)
                } else {
                    throw createError(404, `No Data of ID ${req.params.id} exists`)
                }
            })
            .catch(err => {
                next(err)
            })
    }

}

module.exports = TodosController