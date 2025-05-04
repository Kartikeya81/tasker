const express=require('express');
const taskrouter=express.Router();
const { jwtauthmiddleware} = require('../middlewares/authmiddleware');
const {gettaskbyid,createtask,updatetask,deletetask}=require('../controllers/taskcontroller');



taskrouter.get('/gettask/:id',jwtauthmiddleware,gettaskbyid);
taskrouter.post('/createtask',jwtauthmiddleware,createtask);
taskrouter.put('/updatetask/:id',jwtauthmiddleware,updatetask);
taskrouter.delete('/deletetask/:id',jwtauthmiddleware,deletetask);


module.exports=taskrouter;