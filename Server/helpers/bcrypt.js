const bcrypt = require('bcrypt')
const saltround = 10

function hasher(password){
    return bcrypt.hashSync(password, saltround)
}

function checker(password,hash){
    return bcrypt.compareSync(password, hash)
}

module.exports ={
    hasher,
    checker
}