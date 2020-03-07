const {OAuth2Client} = require('google-auth-library')

module.exports = new OAuth2Client(process.env.GGL_APIKEY)