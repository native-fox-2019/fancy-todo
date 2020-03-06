
module.exports=(err,req,res,next)=>{
    if(err.name==='SequelizeValidationError')
        res.status(400).json(err.errors);
    else
        res.status(500).json(err);
}