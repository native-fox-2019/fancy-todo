const holidayRouter = require('express').Router()
const axios = require('axios')
require('dotenv').config()

holidayRouter.get('/', (request, response, next) => {
    axios({
        method: 'get',
        url: 'https://get.geojs.io/v1/ip/geo.json'
    })
    .then( result => {
        let country_code = result.data.country_code
        return axios({
            method: 'get',
            url: `https://calendarific.com/api/v2/holidays?&api_key=${process.env.CALENDARIFIC_KEY}&country=${country_code}&year=${new Date().getFullYear()}`
        })
    } )
    .then( result => {
        let holidays = []
        result.data.response.holidays.forEach(element => {
            holidays.push({
                name: element.name,
                description: element.description,
                date: new Date(element.date.iso)
            })
        });
        response.status(200).json(holidays)
    } )
    .catch( err => {
        next(err)
    } )
})

module.exports = holidayRouter