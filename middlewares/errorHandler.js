module.exports = {
  handler(err, req, res, next) {
    if (err.errors) {
      res.status(400).json(err.errors);
    } else if (err.status === 404) {
      let Message = "Data Not Found";
      res.status(404).json({ Message });
    } else {
      res.status(500).json(err);
    }
  }
};
