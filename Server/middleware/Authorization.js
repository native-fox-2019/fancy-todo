const models = require('../models');
const ToDo = models.ToDo;
const User = models.User;

module.exports = (req, res, next) => {
    let user = req.user;
    let TodoId = parseInt(req.params.id);

    ToDo.findByPk(TodoId)
        .then(result=>{
            if(result.UserId === user.id){
                req.todo = result;
                next();
            }
            else{
                next({
                    status: 403,
                    message: "Forbidden"
                });
            }
        })
        .catch(next);
};