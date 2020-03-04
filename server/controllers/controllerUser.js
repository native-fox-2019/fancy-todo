'use strict'
const { User } = require('../models')
const jwt = require('jsonwebtoken')
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client("476504549399-atherlcqb2eflh6lr8v3b4a03a65pmum.apps.googleusercontent.com");
const compare = require('../helpers/compare')

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
              // next()
            }
            res.send
          })
          .catch(err => {
            next(err)
          })
        // res.status(201).json(result)
      })
      .catch(err => {
        next(err)
        // console.log(JSON.stringify(err, null, 2));
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
        // res.send(comparePassword)
        if (comparePassword == true) {
          const token = jwt.sign({
            id: result.id,
            username: result.username,
            email: result.email
          }, process.env.secret)
          res.status(200).json(token)
          // next()
        } else {
          throw {
            status: 400,
            msg: "Invalid username / email."
          }
        }
        // res.status(200).json(result)
      })
      .catch(err => {
        // console.log('masuk sini??');
        next({
          status: 404,
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
    // console.log(id_token);
    async function verify() {
      const ticket = await client.verifyIdToken({
        idToken: id_token,
        audience: "476504549399-atherlcqb2eflh6lr8v3b4a03a65pmum.apps.googleusercontent.com",
      });
      const payload = ticket.getPayload();
      // console.log(payload.name);
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
