require('dotenv').config();
const User=require('../models/User');
const bcrypt=require('bcrypt');
const {generatejwt}=require('../authentication/jwt');
const express=require('express');
const app=express();
app.use(express.json());
const cookieparser=require('cookie-parser');
app.use(cookieparser());


exports.registeruser=async (req,res,next)=>{
try{
  const {username,email,password,country}=req.body;

  const checkuser=await User.find({email:email});
  if(checkuser.length>0){
    return res.status(400).json({message:'user already exists',success:false});
  }
  const data=req.body;
  const newuser=new User(data);
  const saveduser=await newuser.save();
  res.status(201).json({ message: 'User registered successfully', success: true });

} 
catch(err){
  console.log(err);
  res.status(500).json({message:'internal server error',success:false});
} 
}
exports.loginuser=async (req,res,next)=>{
try{
  const {email,password}=req.body;
  const user=await User.findOne({email:email})
  if(!user || !(await user.comparePassword(password))){
    return res.status(403).json({message:'Invalid Credentials',success:false});
  }
  const payload={
    id:user._id,
    email:user.email
  };
  const token=generatejwt(payload)
  console.log(token);
  res.cookie('sessiontoken',token,{
    httpOnly:true,
    secure:false,
    maxAge: 24*60*60*1000, //1 day
    sameSite:'lax'
  });
  res.status(200).json({message:'login successful',success:true,token:token});
} 
catch(err){
  console.log(err);
  res.status(500).json({message:'internal server error',success:false});
} 
}
exports.logoutuser=async (req,res,next)=>{
  try{
    res.clearCookie('sessiontoken',{
      httpOnly:true,
    });
    res.json({message:'logout successful',success:true});
  }
  catch(err){
return res.status(500).json({message:'internal server error'})
  }
}
exports.getuserdetails = async (req, res, next) => {
  try {
    const { user } = req;
    const userdetails = await User.findById(user._id).populate("tasks").select("-password");

    if (!userdetails) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Declare task lists before processing
    let pending = [];
    let inprogress = [];
    let completed = [];

    // Iterate through tasks to categorize them
    userdetails.tasks.forEach((task) => {
      if (task.status === "pending") {
        pending.push(task);
      } else if (task.status === "inprogress") {
        inprogress.push(task);
      } else {
        completed.push(task);
      }
    });

    console.log(pending)
    return res.status(200).json({
      success: true,
      tasks: {pending,inprogress,completed }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

