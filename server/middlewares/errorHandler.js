module.exports = {
  handler(err, req, res, next) {
    if (err.errors) {
      res.status(400).json(err.errors);
    } else {
      res.status(err.status || 500).json(err);
    }
  }
};
