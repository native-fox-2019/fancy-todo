const jwt = require('../helpers/jwt.js');
const User = require('../models/user.js');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const decodedToken = jwt.verify(token);
        req.jwt = decodedToken;
        User.findOne({
            where: {
                id: req.jwt.id
            }
        })
            .then(user=>{
                if(user){next()}
                else{
                    throw new Error(res.status)
                }
            })
            .catch(next);

    } catch {
        next(err);
    }
};