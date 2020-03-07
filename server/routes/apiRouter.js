require('dotenv').config()
const express = require('express')
const router = express.Router()
const axios = require('axios')

router.get('/current_weather_data', function (req, res){
    axios({
        method: 'get',
        url: 'http://api.openweathermap.org/data/2.5/weather?q=Jakarta,Indonesia&APPID='+process.env.API_KEY,
    })
    .then(function (response) {
        res.send(response.data)
      })
    .catch(function(err){
        res.send(err)
    })
})

router.get('/news', function (req, res){
    axios({
        method: 'get',
        url: 'http://newsapi.org/v2/everything?q=bitcoin&from=2020-02-07&sortBy=publishedAt&apiKey=b26cbc3a8e544fc0bdae88645907e76c',
    })
    .then(function (response) {
        res.send(response.data)
      })
    .catch(function(err){
        res.send(err)
    })
})

module.exports = router