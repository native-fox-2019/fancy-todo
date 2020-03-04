const models = require('../models');
const ToDo = models.ToDo;
const User = models.User;

module.exports = (req, res, next) => {
    let UserId = req.jwt.UserId;
    let TodoId = req.params.id;

    ToDo.findByPk(TodoId)
        .then(result=>{
            if(result.UserId === UserId){
                next();
            }
            else{
                throw new Error(res.status)
            }
        })
        .catch(next);
    // const email = req.jwt.email;
    // User.findAll({
    //     where: { email: email }
    // }).then(users => {
    //     if (users.length === 0) {
    //         res.status(403).end();
    //     } else {
    //         const user = users[0];
    //         req.user = user;
    //         next();
    //     }
    // }).catch(err => {
    //     res.status(500).end();
    // });
};