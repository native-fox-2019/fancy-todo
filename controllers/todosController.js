const { Todo } = require("../models");

class TodoController {
  static post(req, res) {
    Todo.create(req.body)
      .then(() => {
        res.status(201).send(req.body);
      })
      .catch(err => {
        if (err.name === "SequelizeValidationError") {
          res.status(400).send(err.errors);
        } else {
          res.status(500).send(err);
        }
      });
  }

  static get(req, res) {
    Todo.findAll()
      .then(data => {
        res.status(200).send(data);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  }

  static findOne(req, res) {
    let condition = {
      where: {
        id: req.params.id
      }
    };
    Todo.findOne(condition)
      .then(data => {
        if (!data) {
          throw new Error();
        } else {
          res.status(200).send(data);
        }
      })
      .catch(err => {
        res.status(404).send({ Msg: "Error Not Found" });
      });
  }

  static put(req, res) {
    let condition = {
      where: {
        id: req.params.id
      }
    };
    Todo.update(req.body, condition)
      .then(data => {
        if (!data[0]) {
          throw new Error("data not found");
        } else {
          res.status(200).send(req.body);
        }
      })
      .catch(err => {
        if (err.name === "SequelizeValidationError") {
          res.status(400).send(err.errors);
        } else if (err.message === "data not found") {
          res.status(404).send({ Msg: "Error Not Found" });
        } else {
          res.status(500).send(err);
        }
      });
  }
  static delete(req, res) {
    let condition = {
      where: {
        id: req.params.id
      }
    };
    let deletedData;
    Todo.findOne(condition)
      .then(data => {
        if (!data) {
          throw new Error("data not found");
        } else {
          deletedData = data;
          return Todo.destroy(condition);
        }
      })
      .then(() => {
        res.status(200).send(deletedData);
      })
      .catch(err => {
        if (err.message === "data not found") {
          res.status(404).send({ Msg: "error not found" });
        } else {
          res.status(500).send(err);
        }
      });
  }
}

module.exports = TodoController;
