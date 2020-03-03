const authenticate=require('../google-auth');
const fs=require('fs');

class GoogleCallenderController{
    
    static list(req,res){

        (async function(){
            let calendar=null;
            let flag=0;
            try{
                calendar =await authenticate();
                flag=1;
                let data=await calendar.events.list({
                    calendarId: 'lj5fpqc0ge03cviig9kcbhio0s@group.calendar.google.com',
                    timeMin: (new Date()).toISOString(),
                    maxResults: 10,
                    singleEvents: true,
                    orderBy: 'startTime',
                });
                const events = data.data.items;
                if (events.length) {
                  let r=events.map((event) => {
                    const start = event.start.dateTime || event.start.date;
                    return `${start} - ${event.summary} - ${event.status}`;
                  });
                //   res.status(200).json(events);
                res.status(200).json(r);
                } else {
                  res.send('No Upcomming event found');
                }
                
            }catch(e){
                if(flag===0)
                    res.status(301).json(e);
                else if(flag===1)
                    res.status(500).json({status:500,message:'Ada error',err})
            }
        })()
    
    }

    static reAuth(req,res){

        let code=req.query.code;
        let credentials=fs.readFileSync('./credentials.json');
        const oAuth2Client=authenticate.getOAuth2(credentials);
        (async function(){
            let flag=0;
            try{
                let token=await oAuth2Client.getToken(code);
                oAuth2Client.setCredentials(token);
                flag=1;
                await fs.writeFile(authenticate.TOKEN_PATH,JSON.stringify(token,null,2));
                res.status(201).send({status:201,message:'Token berhasil digenerate'});
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
        let summary=req.body.summary;
        let location=req.body.location;
        let description=req.body.description;
        let status=req.body.status;
        let startDate=req.body.startDate;
        let endDate=req.body.endDate;

        var event = {
            summary: summary,
            location: location,
            description: description,
            status:status,
            start: {
                dateTime: startDate
            },
            end: {
                dateTime: endDate
            }
      };

      (async function(){
        
        try{
            let calendar =await authenticate();
            await calendar.events.insert({
                calendarId:process.env.CALENDAR_ID,
                auth:authenticate.auth,
                resource:event
            })
            res.status(201).json({status:201,message:'Berhasil dibuat'});
        }catch(err){
            res.status(500).json({status:500,err});
        }
      })()

    }

}

module.exports=GoogleCallenderController;