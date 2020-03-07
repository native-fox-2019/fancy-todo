const axios = require('axios')
function generatePass(){
    axios({
        method:'get',
        url:'http://passwordwolf.com/API'
    })
    .then(data=>{
        return data.data[0].password
    })
    .catch(err=>{
        let char='abcefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
        let pass = ''
        for(let i=0;i<10;i++){
            let random = Math.floor(Math.random()*62)
            pass += char[random]
        }
        return pass
    })
}

generatePass()

module.exports = generatePass