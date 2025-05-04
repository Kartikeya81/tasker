const mongoose=require('mongoose');

const todoschema=new mongoose.Schema({
  text:{type:String,required:true},
  completed:{type:Boolean,default:false},
});
const taskschema=new mongoose.Schema({
  
  title:
  {type:String,required:true},
  description:
  {type:String,required:true},
  priority:
  {type:String,enum:["low","medium","high"],default:"Low",required:true},
  status:
  {type:String,enum:["pending","inprogress","completed"],default:"pending"},
  duedate:
  {type:Date},
  progress:
  {type:Number,default:0}
},
{timestamps:true}
);

const Task=mongoose.model('Task',taskschema);
module.exports=Task;