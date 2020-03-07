const authenticate=require('../google-auth');
const fs=require('fs');
const {Todo,User}=require('../models');
const authUser=require('../helpers/authUser');

class GoogleCallenderController{
    
    static list(req,res){

        (async function(){
            let calendar=null;
            try{
                calendar =await authenticate();
                let data=await calendar.events.list({
                    calendarId: process.env.CALENDAR_ID,
                    timeMin: (new Date()).toISOString(),
                    singleEvents: true,
                    orderBy: 'startTime',
                });
                const events = data.data.items;
                if (events.length) {

                    let r=events.map(event=>{
                        let obj={}
                        obj.id=event.id;
                        obj.status=event.status;
                        obj.summary=event.summary;
                        obj.description=event.description;
                        obj.location=event.location;
                        obj.htmlLink=event.htmlLink;
                        return obj;
                    })
                    res.status(200).json(r);
                } else {
                  res.send('No Upcomming event found');
                }
                
            }catch(e){
                authenticate.errorHandler(e,res);
            }
        })()
    
    }

    static reAuth(req,res){

        let code=req.query.code;
        let userID=req.query.userID;
        let credentials=fs.readFileSync('./credentials.json','utf-8');
        const oAuth2Client=authenticate.getOAuth2(JSON.parse(credentials),userID);
        (async function(){
            let flag=0;
            try{
                oAuth2Client.getToken(code,(err,token)=>{
                    if(err){
                        res.status(500).json(err);
                    }
                    oAuth2Client.setCredentials(token);
                    flag=1;
                    User.update({
                        google_token:JSON.stringify(token)
                        },{where:{id:userID}
                    }).then(function(){});
                    res.redirect('http://localhost:8080/')
                    //fs.writeFile(authenticate.TOKEN_PATH,JSON.stringify(token,null,2),()=>{});
                });
               
            }catch(err){
                if(flag===0){
                    res.status(500).send({status:500,message:'Failed to receive token'});
                }
                else if(flag===1){
                    res.json(err);
                }
            }   
        })()
    }

    static addEvent(req,res){
        // res.send('Masuk')
        let todoID=req.body.todoID;
        let token=req.headers.token;

      (async function(){
        
        try{
            let todo=await Todo.findByPk(todoID,{
                include:User
            });
            let calendar =await authenticate(todo.User);

            var event = todo.for_google;

            let data=await calendar.events.insert({
                calendarId:process.env.CALENDAR_ID,
                auth:authenticate.auth,
                resource:event
            })

            if(data){
                todo.set('g_id',data.data.id);
                await todo.save();
            }

            res.status(201).json({status:201,message:'Berhasil dibuat',data:todo,gdata:data.data.id});
           
        }catch(err){
            authenticate.errorHandler(err,res);
        }
      })()

    }

    static updateEvent(req,res){
        let eventId=req.body.eventId;

        (async function(){
            try{
                let todo=await Todo.findOne({
                    where:{g_id:eventId},
                    include:User
                });
                var event = todo.for_google;

                let calendar =await authenticate(todo.User);
                let data=await calendar.events.update({
                    calendarId:process.env.CALENDAR_ID,
                    auth:authenticate.auth,
                    eventId:eventId,
                    resource:event
                })
                res.status(200).json({status:200,message:'Berhasil diubah',data:data});
            }catch(err){
                authenticate.errorHandler(err,res);
            }
          })()
    }

    static deleteEvent(req,res){
        // res.send('Masuk ke delete')
        let eventId=req.body.eventId;

        (async function(){

            try{
                let curr_user=await authUser(req.headers.token);
                let calendar =await authenticate(curr_user);
                await calendar.events.delete({
                    calendarId:process.env.CALENDAR_ID,
                    auth:authenticate.auth,
                    eventId:eventId
                })
                await Todo.destroy({where:{g_id:eventId}});
                res.status(200).json({status:200,message:'Berhasil dihapus'});
            }catch(err){
                console.log(err)
                authenticate.errorHandler(err,res);
            }

        })();
    }

}

module.exports=GoogleCallenderController;