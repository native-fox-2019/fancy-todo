const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const routes = require('./routes')
const cors = require('cors')

// cross origin resource sharing
app.use(cors())

// body parser
app.use(express.json())

// routes
app.use(routes)

app.listen(port, () => console.log(`listening on port:${port}`))
