const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.jwt = decodedToken;
        next();
    } catch {
        res.status(401).json({
            error: new Error('Invalid request!')
        });
    }
};