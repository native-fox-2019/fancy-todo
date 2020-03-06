const {User}=require('../models');
const jwt=require('jsonwebtoken');
const authenticate=require('../google-auth');
const credentials=require('../credentials');
const authUser=require('../helpers/authUser');

class AuthController{

    static login(req,res,next){
        (async function(){
            let body=req.body;
            let secret=process.env.JWT_SECRET || 'hehehe'

            try{
                let user=await User.findOne({where:{
                    email:body.email,
                    password:body.password
                }
                });
                if(user){
                    let token = jwt.sign(user.tokenvalue, secret);
                    res.status(200).json({user,token});
                }
                else{
                    res.status(404).json({status:404,message:'username/password is wrong'});
                }

            }catch(err){
                res.status(500).json({status:500,err});
            }
        })();
    }

    static register(req,res,next){
        (async function(){
            let body=req.body;
            let secret=process.env.JWT_SECRET || 'hehehe';
            try{
                let user=await User.create(body);
                res.status(201).json(user);
            }catch(err){
                next(err);
            }

        })();

    }

    static loginWithGoogle(req,res,next){
        (async function(){
            let body=req.body;
            let attrs={
                name:body.name,
                email:body.email,
                password:'dari_google',
                google_login_token:body.login_token
            }

            try{
                let check_user=await User.findOne({where:{email:attrs.email}});
                if(!check_user){
                    let user=await User.create(attrs);
                    res.status(201).json(user);
                }
                else{
                    res.status(201).json(check_user);
                }
            }catch(err){
                next(err);
            }

        })();
    }

    static checkGoogleAuth(req,res){
        (async function(){
            try{
                let curr_user=await authUser(req.headers.token);
                if(curr_user.google_token){
                    res.status(200).json({authenticate:true});
                }
                else{
                    const oAuth2Client=authenticate.getOAuth2(credentials,curr_user.id);
                    let authURL=authenticate.getAccessToken(oAuth2Client);
                    res.status(200).json({authenticate:false,authURL:authURL});
                }
            }catch(err){
                authenticate.errorHandler(err,res);
            }
        })();
    }
}

module.exports=AuthController;