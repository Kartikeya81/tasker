const mongoose=require('mongoose');
const bcrypt=require('bcrypt')
const userschema= new mongoose.Schema({

  username:{
        type:String,
        required:true,

  },
  email:{
    type:String,
    required:true,
    unique:true
    
  },
  password:{
    type:String,
    required:true,
  },
  country:{
    type:String,
    default:null
  },
  tasks:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:'Task'
    }
  ]
},
 { timestaamp:true}
);


userschema.pre('save',async function(next){
  const user=this;
  if(!user.isModified('password')){
    return next();
  }
  try{
    const salt=await bcrypt.genSalt(10);
    const hashedpassword=await bcrypt.hash(user.password,salt);
    user.password=hashedpassword;
    next();
  }
  catch(err){
    return next(err);
  }
});
userschema.methods.comparePassword=async function(userpassword){
  try{
     const isMatch=await bcrypt.compare(userpassword,this.password);
     return isMatch;
  }
  catch(err){
throw(err);
  }
}

const User=mongoose.model('User',userschema);
module.exports=User;