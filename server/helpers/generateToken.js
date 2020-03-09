"use strict"
const jwt = require('jsonwebtoken')
const generateToken = (databaseId, databaseUsername) => { const token = jwt.sign({ id: databaseId, username: databaseUsername }, process.env.SECRET_KEY);
   
    return token
}

module.exports = generateToken