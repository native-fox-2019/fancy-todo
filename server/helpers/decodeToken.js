const jwt=require('jsonwebtoken');

module.exports=(token)=>{
    let secret=process.env.JWT_SECRET;
    let decoded =jwt.decode(token,secret);
    return decoded;
}