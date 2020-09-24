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
    let sekarang = new Date()
    let tanggal = sekarang.getDate()
    let bulan = sekarang.getMonth()
    let tahun = sekarang.getFullYear()
    console.log(process.env.APINEWS_KEY+"<<huhu")
    axios({
        method: 'get',
        url: `http://newsapi.org/v2/top-headlines?country=id&from=${tahun}-${bulan}-${tanggal}&sortBy=publishedAt&apiKey=${process.env.APINEWS_KEY}`,
    })
    .then(function (response) {
        res.send(response.data)
      })
    .catch(function(err){
        res.send(err)
    })
})

module.exports = router