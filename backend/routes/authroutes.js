const express=require('express');
const authrouter=express.Router();

const {registeruser,loginuser,logoutuser,getuserdetails}=require('../controllers//authcontroller')
const {jwtauthmiddleware}=require('../middlewares/authmiddleware')



authrouter.post('/register',registeruser);
authrouter.post('/login',loginuser);
authrouter.post('/logout',logoutuser);
authrouter.get('/getuserdetails',jwtauthmiddleware,getuserdetails);

module.exports=authrouter;