const authenticate=require('../google-auth');
const fs=require('fs');
const tokenDecoder=require('../helpers/decodeToken');
const {Todo}=require('../models');

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
        let credentials=fs.readFileSync('./credentials.json','utf-8');
        const oAuth2Client=authenticate.getOAuth2(JSON.parse(credentials));
        (async function(){
            let flag=0;
            try{
                oAuth2Client.getToken(code,(err,token)=>{
                    if(err){
                        throw err;
                    }
                    oAuth2Client.setCredentials(token);
                    flag=1;
                    fs.writeFile(authenticate.TOKEN_PATH,JSON.stringify(token,null,2),()=>{});
                    res.status(201).send({status:201,message:'Token berhasil digenerate'});
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
            let calendar =await authenticate();
            let todo=await Todo.findByPk(todoID);

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
                let todo=await Todo.findOne({where:{g_id:eventId}});
                var event = todo.for_google;

                let calendar =await authenticate();
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
                await Todo.destroy({where:{g_id:eventId}});
                let calendar =await authenticate();
                await calendar.events.delete({
                    calendarId:process.env.CALENDAR_ID,
                    auth:authenticate.auth,
                    eventId:eventId
                })
                res.status(200).json({status:200,message:'Berhasil dihapus'});
            }catch(err){
                authenticate.errorHandler(err,res);
            }

        })();
    }

}

module.exports=GoogleCallenderController;