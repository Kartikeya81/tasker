const jwt=require('jsonwebtoken');
require('dotenv').config();
const User=require('../models/User');


const jwtauthmiddleware=async (req,res,next)=>{
 const token=req.cookies.sessiontoken
 console.log(2);
 console.log(token);
 console.log(2);
  if(!token){
    return res.status(401).json({message:'unauthorized',success:false});
  }
  try{
    const decoded=jwt.verify(token,process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    req.user=user;
    req.userpayload=decoded;
    next();
  }
  catch(err){
    console.log(err);
    return res.status(401).json({message:'unauthorized',success:false});
  }
}

module.exports={jwtauthmiddleware};