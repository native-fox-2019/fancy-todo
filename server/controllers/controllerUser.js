'use strict'
const { User } = require('../models')
const jwt = require('jsonwebtoken')
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client("476504549399-atherlcqb2eflh6lr8v3b4a03a65pmum.apps.googleusercontent.com");
const compare = require('../helpers/compare')
const sendEmail = require('../helpers/api')
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


class controllerUser {
  static register(req, res, next) {
    const { username, email, password } = req.body;
    User
      .create({
        username,
        email,
        password
      })
      .then(result => {
        let msg = sendEmail(result.email, `${result.email} You've been registered on our Application. Thank you for using our application.`)
        sgMail.send(msg)

        User
          .findOne({
            where: {
              email: result.email
            }
          })
          .then(result => {
            const comparePassword = compare(password, result.password);
            if (comparePassword) {
              const token = jwt.sign({
                id: result.id,
                username: result.username,
                email: result.email
              }, process.env.secret)
              res.status(200).json(token)
            }
            res.send
          })
          .catch(err => {
            next(err)
          })
      })
      .catch(err => {
        next(err)
      })
  }
  static login(req, res, next) {
    const { email, password } = req.body
    User
      .findOne({
        where: {
          email: email,
        }
      })
      .then(result => {
        const comparePassword = compare(password, result.password)
        if (comparePassword == true) {
          const token = jwt.sign({
            id: result.id,
            username: result.username,
            email: result.email
          }, process.env.secret)
          res.status(200).json(token)
        } else {
          throw {
            status: 400,
            msg: "Invalid username / email."
          }
        }
      })
      .catch(err => {
        next({
          status: 400,
          msg: "Invalid email / password."
        })
      })
  }
  static readAllUser(req, res, next) {
    User
      .findAll()
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        res.send(err)
      })
  }

  static googleLogin(req, res, next) {
    const { id_token } = req.body;
    async function verify() {
      const ticket = await client.verifyIdToken({
        idToken: id_token,
        audience: "476504549399-atherlcqb2eflh6lr8v3b4a03a65pmum.apps.googleusercontent.com",
      });
      const payload = ticket.getPayload();
      User
        .findOne({
          where: {
            email: payload.email,
          }
        })
        .then(result => {
          if (result) {
            const token = jwt.sign({
              id: result.id,
              username: result.username,
              email: result.email
            }, process.env.secret)
            res.status(200).json(token)
          } else {
            User
              .create({
                username: payload.name.split(" ").join(""),
                email: payload.email,
                password: "12345",
              })
              .then(result => {
                let msg = sendEmail(result.email, `${result.email} You've been registered on our Application. Thank you for using our application.`)
                sgMail.send(msg)
                const token = jwt.sign({
                  id: result.id,
                  username: result.username,
                  email: result.email
                }, process.env.secret)
                res.status(200).json(token)
              })
              .catch(err => {
                next(err)
              })
          }
        })
    }
    verify().catch(console.error);
  }
}

module.exports = controllerUser
