const express = require(`express`)
const app = express()
const port = process.env.port || 3000
const router = require(`./routes`)
const errorHandler = require (`./middleware/errorHandler`)

app.use(express.json())

app.use(`/`, router)


app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
})

module.exports = app