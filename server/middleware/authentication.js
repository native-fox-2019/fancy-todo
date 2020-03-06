const jwt=require('jsonwebtoken');

module.exports=(req,res,next)=>{
    let {token}=req.headers;

    if(token){
        let secret=process.env.JWT_SECRET || 'hehehe' ;

        try{
            jwt.verify(token,secret);
        }
        catch(err){
            res.status(400).json({status:400,message:'Token invalid'});
            return;
        }
        next();
    }
    else{
        res.status(401).json({status:401,message:'Unauthenticated'});
    }

}