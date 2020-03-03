const jwt = require("jsonwebtoken");
module.exports = {
  authorization(req, res, next) {
    let { token } = req.headers;
    try {
      let decoded = jwt.verify(token, process.env.SECRET);
      console.log(decoded);
      next()
    } catch (err) {
      next(err);
    }
  }
};
