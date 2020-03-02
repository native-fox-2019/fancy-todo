const { Todo } = require("../models");

class TodoController {
  static post(req, res) {
    Todo.create(req.body)
      .then(() => {
        res
          .status(201)
          .json({ Message: "Todo Has Been Created.", Data: req.body });
      })
      .catch(err => {
        if (err.errors) {
          res.status(400).json(err.errors);
        } else {
          res.status(500).json(err);
        }
      });
  }

  static get(req, res) {
    Todo.findAll()
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => {
        res.status(500).json(err);
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
          res.status(200).json(data);
        }
      })
      .catch(err => {
        err.Message = "Error Not Found";
        res.status(404).json(err);
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
          res
            .status(200)
            .json({ Message: "Data Has Been Updated", Data: req.body });
        }
      })
      .catch(err => {
        if (err.errors) {
          res.status(400).json(err.errors);
        } else if (err.message === "data not found") {
          err.Message = "Error Not Found";
          res.status(404).json(err);
        } else {
          res.status(500).json(err);
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
        res
          .status(200)
          .json({ Message: "Data Has Been Deleted", Data: deletedData });
      })
      .catch(err => {
        if (err.message === "data not found") {
          err.Message = "Error Not Found";
          res.status(404).json(err);
        } else {
          res.status(500).json(err);
        }
      });
  }
}

module.exports = TodoController;
