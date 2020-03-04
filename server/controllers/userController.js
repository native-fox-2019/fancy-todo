const { User } = require(`../models`)
const {OAuth2Client} = require('google-auth-library')
const client = new OAuth2Client(process.env.G_CLIENT_ID)


class UserController {
    
    static googleSign (req, res, next) {
        // console.log(client)
    }
    
      
}

module.exports = UserController