
function showErrors(err, req, res, next) {
  console.log(err, 'masuk sini gak?');
  const arrErrors = [];
  if (err.name === 'SequelizeUniqueConstraintError') {
    res.status(401).json('Email already registered.')
  } else if (err.name === "SequelizeValidationError") {
    err.errors.forEach(errs => {
      arrErrors.push(errs.message)
    });
    // res.status(401).json(arrErrors)
  }
  else if (err.status) {
    res.status(err.status).json(err.msg)
  }
}

module.exports = showErrors