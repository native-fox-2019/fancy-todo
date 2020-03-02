'use strict'

const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000
const router = require('./routes/router')

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use('/', router)
app.use((err,req,res,next)=>{
    console.log(err)
    if(err.name === 'SequelizeValidationError'){
        const message = err.errors.map(el=>el.message)
        res.status(400).json({message})
    } else if (err.status === 404 ) {
        res.status(404).json({err:err.msg})
    } else {
        console.log(err)
        res.status(500).json({errMessage:'internal server error'})
    }
})

app.listen(port, ()=>{
    console.log('istening to port', port)
})