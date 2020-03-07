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
                name: payload.name,
                email: payload.email,
                password: "hanyatuhandandiayangtahu"
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

