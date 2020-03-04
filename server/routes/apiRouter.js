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
        console.log(response.data)
        res.send(response.data)
      })
})


module.exports = router