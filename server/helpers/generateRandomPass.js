const axios = require('axios')
function generatePass() {
    let char='abcefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
    let pass = ''
    for(let i=0;i<10;i++){
        let random = Math.floor(Math.random()*62)
        pass += char[random]
    }
    return pass

    /* yang disini harusya membuat random password dengan menembak API, 
    tapi terlalu lama saat processing jadi data selalu terlambat di proses
    
    // axios({
            method:'get',
            url:'http://passwordwolf.com/API'
        })
        .then(response=>{
                return response.data[0].password
        }
    })
    .catch(err=>{
        let char='abcefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
        let pass = ''
        for(let i=0;i<10;i++){
            let random = Math.floor(Math.random()*62)
            pass += char[random]
        
    })*/
}

// generatePass()
// console.log(generatePass())

module.exports = generatePass