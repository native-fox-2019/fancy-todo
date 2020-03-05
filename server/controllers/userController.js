const { User } = require(`../models`)
const {OAuth2Client} = require('google-auth-library')
const client = new OAuth2Client(process.env.G_CLIENT_ID)
const token = require(`../helper/token`)


class UserController {
    
    static googleSign (req, res, next) {
        let gToken = req.body.token
        let payload = null
        client.verifyIdToken({
            idToken:gToken,
            audience: process.env.G_CLIENT_ID
        })
        .then(data => {
            payload = data.getPayload()
            return User.findOne({where:{email:payload.email}})
        })
        .then(data => {
            let createUser = {
                id: data.id,
                name: data.name,
                email: data.email,
                password: "12345"
            }

            if (data == null) {
               User.create(createUser)
               .then(data => {
                   let user = {
                       id: data.id,
                       name: data.name,
                       email: data.email
                   }

                   let tokens = token(user)
                   res.status(200).json(tokens)
               })
            } else {
                let gotToken = token({
                    id: data.id,
                    name: payload.name,
                    email: payload.email
                })

                req.headers = gotToken
                req.userData = {
                    id: createUser.id,
                    name: createUser.name,
                    email: createUser.email
                }
                res.status(200).json(gotToken)
            }
        })
        .catch(err => {
            console.log(err)
            next(err)
        })
        

    }
    
      
}

module.exports = UserController

/*


iss: 'accounts.google.com',
  azp: '967618393359-hq93iiftc26gklc1q3v5kvtfbpb66do3.apps.googleusercontent.com',
  aud: '967618393359-hq93iiftc26gklc1q3v5kvtfbpb66do3.apps.googleusercontent.com',
  sub: '115123363176424577536',
  email: 'oddy.sutrisno@gmail.com',
  email_verified: true,
  at_hash: 'eU1elQrDrQ_mOkdpPlTEiQ',
  name: 'Mochi Cat',
  picture: 'https://lh3.googleusercontent.com/a-/AOh14Gi0qC6RDv4ir1TmQ_sqGQJlBlu06FLf_KJVGJ9Ptg=s96-c',
  given_name: 'Mochi',
  family_name: 'Cat',
  locale: 'en',
  iat: 1583376310,
  exp: 1583379910,
  jti: 'c6bfca7c4b775430d445e35dbe9aeb656140b653'




*/