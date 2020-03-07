const { User } = require('../models')
const axios = require('axios')
const { verifyPassword } = require('../helper/bcrypt')
const { generateJwt, verifyJwt } = require('../helper/jwt')
const createError = require('../helper/http-errors')
const { OAuth2Client } = require('google-auth-library')
const instance = axios.create({
  baseURL: `https://api.mailboxvalidator.com/v1/validation/single?key=${process.env.API_KEY}`
});





class ControllerUser {
  static registerUser(req, res, next) {
    let { username, email, password } = req.body
    instance.get(`&email=${email}`)
      .then(validateResult => {
        if (validateResult.data.is_verified == "True") {
          return User.create({ username, email, password })
        } else {
          let err = createError(400, 'Email invalid')
          next(err)
        }
      })
      .then(user => {
        let payload = { id: user.id, username: user.username, email: user.email }
        const token = generateJwt(payload)
        const sgMail = require('@sendgrid/mail')
        sgMail.setApiKey(process.env.SENDGRID_API_KEY)
        const msg = {
          to: `${req.body.email}`,
          from: 'novan.top@gmail.com',
          subject: 'Terimakiash Telah bergabung',
          text: `HEI ${user.username} WaDub Bruv`,
          html: `<strong>HEI ${user.username} WaDub Bruv</strong>`,
        }
        sgMail.send(msg);
        res.status(201).json(token)
      })
      .catch(err => {
        // let err = createError(400, 'Bad Request')
        next(err)
      })
    // User
    //   .create({ username, email, password })
    //   .then(user => {
    //     let payload = { id: user.id, username: user.username, email: user.email }
    //     const token = generateJwt(payload)
    //     res.status(201).json(token)
    //   })
    //   .catch(err => {
    //     next(err)
    //   })
  }

  static loginUser(req, res, next) {
    let { email, password } = req.body
    User
      .findOne({ where: { email } })
      .then(userLogin => {
        if (!userLogin) {
          throw createError(400, 'email/password wrong')
        } else {
          if (verifyPassword(password, userLogin.password)) {
            let payload = { id: userLogin.id, email: userLogin.email }
            const token = generateJwt(payload)
            res.status(200).json(token)
          } else {
            throw createError(400, 'email/password wrong')
          }
        }
      })
      .catch(err => {
        next(err)
      })
  }


  static googleSign(req, res, next) {
    let payload
    const client = new OAuth2Client(process.env.GoogleClienId)
    client.verifyIdToken({
      idToken: req.body.token,
      audience: process.env.GoogleClienId,  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    })
      .then(ticket => {
        payload = ticket.getPayload()
        // const userid = payload['sub']
        return User
          .findOne({
            where: {
              email: payload.email
            }
          })
          .then(result => {
            if (result) {

              // const token = jwt.sign({ email: result.email, id: result.id }, process.env.JWT)
              let payload = { email: result.email, id: result.id }
              const token = generateJwt(payload)
              res.status(201).json(token)
            } else {
              User
                .create({
                  username: payload.given_name,
                  email: payload.email,
                  password: process.env.DefaultPassword
                })
                .then(newUser => {
                  const token = jwt.sign({ email: newUser.email, id: newUser.id }, process.env.JWT)
                  res.status(201).json(token)
                })
            }
          })
      })
      .catch(err => {
        next(err)
      })
  }

}
module.exports = ControllerUser