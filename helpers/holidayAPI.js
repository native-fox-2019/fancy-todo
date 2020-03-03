const { HolidayAPI } = require('holidayapi');

const key = process.env.HOLIDAY_API_KEY;
const holidayApi = new HolidayAPI({ key });

function holidayIdn(req, res, next) {
    let date = req.body.due_date.split('-'),
        year = Number(date[0]),
        month = Number(date[1]),
        day = Number(date[2]);
    holidayApi.holidays({ country: 'ID', year, month, day })
      .then(holiday => res.holiday = holiday)
      .catch(err =>  next(err));
}

module.exports = holidayIdn;