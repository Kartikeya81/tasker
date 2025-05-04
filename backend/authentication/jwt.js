const jwt=require('jsonwebtoken');
require('dotenv').config();


const generatejwt=(userdata)=>{
  return jwt.sign(userdata,process.env.JWT_SECRET,{expiresIn:"7d"})
};

module.exports={
  generatejwt
};