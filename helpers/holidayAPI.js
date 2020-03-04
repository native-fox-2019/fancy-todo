const { HolidayAPI } = require('holidayapi');

const key = process.env.HOLIDAY_API_KEY;
const holidayApi = new HolidayAPI({ key });

function holidayIdn(due_date) {
    let date = due_date.split('-'),
        year = Number(date[0]),
        month = Number(date[1]),
        day = Number(date[2]);
    return holidayApi.holidays({ country: 'ID', year, month, day })
}

// function holidayIdn(due_date) {
    // let date = due_date.split('-'),
    //     year = Number(date[0]),
    //     month = Number(date[1]),
    //     day = Number(date[2]);
    // // holidayApi.holidays({ country: 'ID', year, month, day })
    // //   .then(holiday => {
    // //       console.log(holiday.holidays[0].name);
    // //       return holiday.holidays[0].name;
    // //     })
    // //   .catch(err =>  next(err));
    // holidayApi.holidays({ country: 'ID', year, month, day }, (err, data) => {
    //     if (!err) {
    //         console.log(data,'=================================== Helper');
    //         return data.holidays[0].name;
    //     } else {
    //         console.log(err);
    //     }
    // })
// }

module.exports = holidayIdn;