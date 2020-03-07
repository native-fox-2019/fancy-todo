const axios = require('axios')

const router = require('express').Router()

router.get('/5daysforecast', function(req, res){
    axios({
        method: "get",
        url: "http://api.openweathermap.org/data/2.5/forecast?q=Jakarta&appid=d2606a9ee3680c51b60d1b000b2647f4"
    })
    .then((response)=> {
        res.status(200).json(response.data)
    })
})

module.exports = router