const axios = require('axios')
function generatePass(){
    axios({
        method:'get',
        url:'http://passwordwolf.com/API'
    })
    .then(response=>{
        // console.log(response.data[0].password)
        if(response.data[0].password){
            return response.data[0].password
        } else {
            let char='abcefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
            let pass = ''
            for(let i=0;i<10;i++){
                let random = Math.floor(Math.random()*62)
                pass += char[random]
            }
            return pass
        }
    })
    .catch(err=>{
       
    })
}

// generatePass()
// console.log(generatePass())

module.exports = generatePass