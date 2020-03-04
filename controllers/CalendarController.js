const axios = require('axios').default

class CalendarController{
 static showCalendar(req, res, next){
    axios({
        method: 'get',
        url: `https://calendarific.com/api/v2/holidays?api_key=${process.env.CALENDARIFIC_API_KEY}&country=ID&year=2020`,
      })
        .then(function (response) {
            res.status(200).json(response.data.response.holidays)
        });
 }
}

module.exports = CalendarController