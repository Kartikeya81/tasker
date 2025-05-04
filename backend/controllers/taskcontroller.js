const express=require('express');
const Task=require('../models/Task');

exports.gettaskbyid=async (req,res,next)=>{
  try{
    const {id}=req.params;
    const taskdetail=await Task.findById(id);
    console.log(taskdetail);
    return res.status(200).json({taskdetail})

  }
  catch(err){
    res.status(500).json({message:'internal Server error',success:false});
  }
}
exports.createtask=async (req,res,next)=>{
  try{
      const taskdata=req.body;
        const {user}=req;
        if(!taskdata.title || !taskdata.description || !taskdata.priority){
          return res.status(400).json({message:'Title,Description and Priority are required'},{success:false});
        }
        if(taskdata.description.length>500){
          return res.status(400).json({message:'Description should be less than 50 Characters'},{success:false});
        }
        const newtask=new Task(taskdata);
        const savetask=await newtask.save();
        user.tasks.push(savetask._id)
        await user.save();
        res.status(201).json({message:'Task created successfully',success:true});
      }
  
  catch(err){
    console.log(err);
    res.status(500).json({message:'internal Server error',success:false});
  }
}
exports.updatetask=async (req,res,next)=>{
  try{
    const {id}=req.params;
    const {title,description,priority,status,progress}=req.body;
        const {user}=req;

        if(!title || !description || !priority){
          return res.status(400).json({message:'Title,Description and Priority are required'},{success:false});
        }
        if(description.length>500){
          return res.status(400).json({message:'Description should be less than 50 Characters'},{success:false});
        }
        const taskdetail=await Task.findByIdAndUpdate(id,{title,description,priority,status,progress},{new:true});
        return res.status(200).json({message:'Task updated successfully',success:true});
    
  }
  catch(err){
    res.status(500).json({message:'internal Server error',success:false});
  }
}
exports.deletetask=async (req,res,next)=>{
  try{
 const {id}=req.params;
    const taskdetail=await Task.findByIdAndDelete(id);
    res.status(200).json({ message: "Task deleted successfully"},{ success: true });
  }
  catch(err){
    res.status(500).json({message:'internal Server error',success:false});
  }
}
