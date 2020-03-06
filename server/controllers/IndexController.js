
class IndexController{

    static index(req,res){
        res.render('index')
    }

    static todo(req,res){
        res.render('todo');
    }

}

module.exports=IndexController;