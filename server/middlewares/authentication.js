const jwt = require("jsonwebtoken");
module.exports = {
  authentication(req, res, next) {
    let { token } = req.headers;
    try {
      req.userData = jwt.verify(token, process.env.SECRET);
      next();
    } catch (err) {
      next(err);
    }
  }
};
