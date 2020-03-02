module.exports = (code, msg) => {
    const createError = require('http-errors');
    return createError(code, msg);
}