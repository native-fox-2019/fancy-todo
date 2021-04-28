
function showErrors(err, req, res, next) {
  const arrErrors = [];
  if (err.name === 'SequelizeUniqueConstraintError') {
    res.status(401).json('Email already registered.')
  } else if (err.name === "SequelizeValidationError") {
    err.errors.forEach(errs => {
      arrErrors.push(errs.message)
    });
  }
  else if (err.status) {
    res.status(err.status).json(err.msg)
  }
}

module.exports = showErrors