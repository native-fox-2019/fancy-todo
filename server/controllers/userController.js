const { User } = require("../models");
const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const { compare } = require("../helpers/hashed");

class Controller {
  static register(req, res, next) {
    User.create(req.body)
      .then(data => {
        res.status(201).json({ Message: "User Has Been Created." });
      })
      .catch(err => {
        next(err);
      });
  }
  static login(req, res, next) {
    let condition = {
      where: {
        username: req.body.username
      }
    };
    User.findOne(condition)
      .then(data => {
        if (!data) {
          // IF DATA NOT FOUND
          throw createError(404);
        } else {
          //IF DATA FOUND
          if (compare(req.body.password, data.password)) {
            // OUTPUT COMPARE TRUE OR FALSE
            let token = jwt.sign(
              {
                id: data.id,
                username: req.body.username,
                email: req.body.email
              },
              process.env.SECRET
            ); // GENERATE TOKEN JWT
            res.status(200).json({ token }); // SEND TOKEN JWT
          } else {
            throw createError(400); // IF WRONG PASSWORD
          }
        }
      })
      .catch(err => {
        next(err);
      });
  }
}

module.exports = Controller;
