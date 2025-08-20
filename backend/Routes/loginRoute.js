const express =require('express');
const loginRoute = express.Router();
const signupModel = require('../Models/signupModels')

loginRoute.get('/',async(req,res)=>{
    admin = await signupModel.find();
    res.json({"msg":"success","value":admin});
});

loginRoute.post('/',async(req,res)=>{
    const email = req.body.email
    const password = req.body.password
    admin = await signupModel.findOne({email:email});
    if(admin && admin.password==password){
        return res.json({"msg":"success"});
    }
    else{
        return res.json({"msg":"Failed"});
    }
});

module.exports = loginRoute;