const morgan = require ('morgan');
const chalk = require ('chalk');

const methodColor = (method) => {
    switch (method) {
        case "GET": return chalk.green;
        case "POST": return chalk.yellow;
        case "DELETE": return chalk.red;
        case "PUT": return chalk.blueBright;
        case "PATCH": return chalk.purple;
        default: return chalk.green;
    }
}

const morganChalk = morgan(function (tokens, req, res) {
    const method = tokens.method(req, res);
    return [
        methodColor(method).bold(method),
        res.statusCode >= 400 ? chalk.red.bold(tokens.status(req, res)) : chalk.green.bold(tokens.status(req, res)),
        chalk.white(tokens.url(req, res)),
        chalk.yellow(tokens['response-time'](req, res) + ' ms'),
    ].join(' ');
});

module.exports = morganChalk;