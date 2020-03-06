const decodeToken=require('./decodeToken');
const {User}=require('../models');

module.exports=(token)=>{
    let decoded=decodeToken(token);
    let userId=decoded.id;

    return User.findByPk(userId);
}