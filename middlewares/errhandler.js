
function ErrorHandler (err,req,res,next){
    console.log(err,'masuk error')
    if (err.name==="JsonWebTokenError"){
        let obj = {msg:"Invalid Token"}
        res.status(500).json(obj)
    } 
    if(err.status){
        res.status(err.status).json(err)
    }
    else{
        let obj = {
            status:500,
            msg:"internal server error"
        }
        res.status(500).json(obj)
    }
       

}

module.exports=ErrorHandler