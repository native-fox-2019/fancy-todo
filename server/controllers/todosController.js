const { Todo, User } = require("../models");
const createError = require("http-errors");
const { sendgrid } = require("../helpers/sendgridAPI");

class TodoController {
  static post(req, res, next) {
    let inputData = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date,
      UserId: req.userData.id
    };
    let email = req.userData.email;
    Todo.create(inputData)
      .then(() => {
        sendgrid(inputData, email);
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
