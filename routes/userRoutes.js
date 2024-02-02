const express = require("express");
const bcrypt = require("bcrypt")
const userRouter = express.Router();
const { UserModel}=require("../models/userModels");
const jwt=require("jsonwebtoken")

userRouter.post("/register",async(req,res)=>{
    const {email, username,pass}=req.body;
    console.log("Data in the body",req.body)
    try {
        bcrypt.hash(pass, 5,async function(err, hash) {
            console.log(hash)
            if(err){
                res.send("something went wrong while hashing")
            }else{
                const user = new UserModel({username,email,pass:hash});
                await user.save()
                res.send("new has been created")
            }
            
        });
    } catch (error) {
        res.send("error is registering user")
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,pass}=req.body;
    try {
        const user = await UserModel.findOne({email});
        if(user){
            bcrypt.compare(pass, user.pass, function(err, result) {
                if(result){
                    const token = jwt.sign({userID:user._id,user:user.username }, 'masai');
                    res.send({"msg":"login successfully","token":token})
                }else{
                    res.send("wrong password")
                }
            });
        }
    } catch (error) {
        res.send({"error":error})
    }
})

module.exports={
    userRouter
}