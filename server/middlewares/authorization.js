const { Todo } = require("../models");
const createError = require("http-errors");

module.exports = {
  authorization(req, res, next) {
    try {
      let condition = {
        where: {
          id: req.params.id
        }
      };
      Todo.findOne(condition).then(data => {
        if (data) {
          if (data.UserId === req.userData.id) {
            next();
          } else {
            throw createError(403, "You're Unauthorized to do this.");
          }
        } else {
          throw createError(404);
        }
      });
    } catch (err) {
      next(err);
    }
  }
};
