require(`dotenv`).config()
const express = require(`express`)
const app = express()
const router = require(`./routes`)
const errorHandler = require (`./middleware/errorHandler`)
const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended:false }))

app.use(`/`, router)
app.use(errorHandler)


app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
})

module.exports = app