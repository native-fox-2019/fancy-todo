const { Todo } = require('../models')


class Controller {
    static post_todos(request, response,next){
        // console.log(request.userData.id,'==============ini controller')
    let obj = {
        title:request.body.title,
        description:request.body.description,
        status:request.body.status,
        due_date:request.body.due_date,
        UserId:Number(request.userData.id)
    }
    Todo.create(obj)
    .then(result=>{
        response.status(201).json(result)
    })
    .catch(err=>{
        if(err){
            let obj={
                status:400,
                msg:[]
            }
            for (let i = 0; i < err.errors.length ; i++){
                obj.msg.push(err.errors[i].message)
            }
            next(obj)
        }else{
            let errObj={
                status:500,
                msg:"internal server error"
            }
            next(errObj)
        }
    })
    
    }
    
    static getTodos (request,response){
        Todo.findAll()
        .then(result=>{
            response.status(200).json(result)
        })
        .catch(err =>{
            next(err)
        })
    }

    static getTodosById (request,response,next){
        let Pk = Number(request.params.id)
        console.log(Pk,'ini primary key')
        Todo.findByPk(Pk)
        .then(result=>{
            console.log(result,"ini dari getbyID")            
            response.status(200).json(result)
        })
        .catch(err=>{
            next(err)
        })
    }

    static putTodos (request,response,next){
        let id = request.params.id
        let obj = request.body
        Todo.update(obj,{where:{id:id}})
        .then(result=>{
            if(result[0]){
                return Todo.findByPk(id)
            }else{
                response.status(404).json("not found")
            }
        })
        .then(res=>{
            response.status(200).json(res)
        })
        .catch(err=>{
            if (err){
                let obj={
                    status:400,
                    msg:[]
                }
                for (let i = 0; i < err.errors.length ; i++){
                    obj.msg.push(err.errors[i].message)
                }
                next (obj)
            }
            else{
                next(err)
                
            }
        })
    }

    static deleteTodos (request,response,next){
        let id = request.params.id
        let data = null
        Todo.findByPk(id)
        .then(result=>{
            data=result
            if (result){
                return Todo.destroy({where:{id}})    
            }
        })
        .then(res=>{
            console.log(res,'ini res delete')
            let send = [data,'data telah dihapus']
            // data.msg="telah berhasil dihapus"
            console.log(res)
                response.status(200).json(send)
        })
        .catch(err=>{
            next(err)
        })
    }


}


module.exports=Controller
