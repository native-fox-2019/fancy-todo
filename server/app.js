require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const routes = require('./routes')
const errorHandler = require('./middlewares/errorHandler')
const cors = require('cors')

// const { google } = require('googleapis')
// const token = require('./token')

// cross-origin-resource-sharing
app.use(cors())


// body parser
app.use(express.json())
app.use(express.urlencoded({ extended:false }))

// app.post('/getCalender', (req, res, next) => {
//     let { client_id, client_secret, redirect_uris } = process.env
//     let auth = new google.auth.OAuth2(
//         client_id, client_secret, redirect_uris)
//     auth.setCredentials(token)
//     const calender = google.calendar({ version: 'v3', auth })
//     calender.events.insert({
//         calendarId: 'primary',
//         resource: {
//             start: {
//                 dateTime: "2020-03-09T15:00:00+07:00"
//             },
//             end: {
//                 dateTime: "2020-03-09T15:00:00+07:00"
//             },
//             summary: "crot2"
//         }
//         // start: new Date(),
//         // end: new Date(),
//         // summary: 'hahahaha'
//         // timeMin: (new Date()).toISOString(),
//         // maxResults: 10,
//         // singleEvents: true,
//         // orderBy: 'startTime',
//       }, (err, result) => {
//           if (result) {
//               res.status(200).json(result)
//           } else {
//               res.status(500).json(err)
//           }
//       })
// })
// routes
app.use(routes)
app.use(errorHandler)

app.listen(port, () => console.log(`listening on port:${port}`))
