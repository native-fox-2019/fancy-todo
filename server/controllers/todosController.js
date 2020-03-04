const { Todo, User } = require("../models");
const createError = require("http-errors");
require("dotenv").config();
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

class TodoController {
  static post(req, res, next) {
    let inputData = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date,
      UserId: req.userData.id
    };
    Todo.create(inputData)
      .then(() => {
        const msg = {
          to: "darindra23@gmail.com",
          from: "noreply.todolistapp@mail.com",
          subject: "You've created a todo list !",
          html: `
          Congratulations you've created a todo list ! </br>
          </br>
          </br>
          Don't Forget you have a deadline to finish your task. </br>
          Here is your todo list : </br>
          </br>
          TITLE : </br>
          ${inputData.title} </br>
          DESCRIPTION : </br>
          ${inputData.description} </br>
          STATUS : </br>
           ${inputData.status} </br>
          DEADLINE :  </br>
          ${inputData.due_date} </br>
          </br>
          </br>
          <strong>TODO APPS BY DARINDRA R</strong>`
        };
        sgMail.send(msg);
        res
          .status(201)
          .json({ Message: "Todo Has Been Created.", Data: req.body });
      })
      .catch(err => {
        next(err);
      });
  }

  static get(req, res, next) {
    let condition = {
      where: {
        UserId: req.userData.id
      },
      include: User,
      order: [["id", "ASC"]]
    };
    Todo.findAll(condition)
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => {
        next(err);
      });
  }

  static findOne(req, res, next) {
    let condition = {
      where: {
        id: req.params.id,
        UserId: req.userData.id
      }
    };
    Todo.findOne(condition)
      .then(data => {
        if (!data) {
          throw createError(404, "Data Not Found");
        } else {
          res.status(200).json(data);
        }
      })
      .catch(err => {
        next(err);
      });
  }

  static put(req, res, next) {
    let condition = {
      where: {
        id: req.params.id
      }
    };
    console.log(req.body);
    Todo.update(req.body, condition)
      .then(data => {
        if (!data[0]) {
          console.log(data);
          throw createError(404, "Data Not Found");
        } else {
          res
            .status(200)
            .json({ Message: "Data Has Been Updated", Data: req.body });
        }
      })
      .catch(err => {
        next(err);
      });
  }

  static delete(req, res, next) {
    let condition = {
      where: {
        id: req.params.id
      }
    };
    let deletedData;
    Todo.findOne(condition)
      .then(data => {
        if (!data) {
          throw createError(404, "Data Not Found");
        } else {
          deletedData = data;
          return Todo.destroy(condition);
        }
      })
      .then(() => {
        res
          .status(200)
          .json({ Message: "Data Has Been Deleted", Data: deletedData });
      })
      .catch(err => {
        next(err);
      });
  }
}

module.exports = TodoController;
