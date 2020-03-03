require('dotenv').config()
const express = require('express')
const router = express.Router()
const axios = require('axios')

router.get('/current_weather_data', function (req, res){
    axios({
        method: 'get',
        url: 'https://community-open-weather-map.p.rapidapi.com/weather',
        headers: {
            "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
            "x-rapidapi-key": "75d451094amsh903243283455443p16f6d8jsnf5e7688c9342"
        }
    })
})


module.exports = router