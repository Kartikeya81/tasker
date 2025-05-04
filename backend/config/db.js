const mongoose=require('mongoose');
const MONGOURL=process.env.MONGO_URL;

mongoose.connect(MONGOURL);

const db=mongoose.connection;

db.on('connected',()=>{
  console.log('Mongodb Connection Established');
})
db.on('disconnected',()=>{
  console.log('Mongodb connection broken');
})
module.exports=db;