import React, { useState } from 'react'
import axios from 'axios'
const Addtask = ({setAddtaskdiv}) => {
  const [values,setValues]=useState({
    title:'',
    description:'',
    priority:'low',
    status:'pending'
  });
  const change=(e)=>{
    const {name,value}=e.target;
    setValues({...values,[name]:value})
  };
  const addtask = async (e)=>{
    e.preventDefault();
    try{
        const response=await axios.post('http://localhost:8000/api/tasks/createtask',values,{
          withCredentials:true,
        })
        //alert('Task added successfully')
        setAddtaskdiv('hidden');
    }
    catch(err){
      alert('Error while adding task')
      console.log(err);
    }
  }
  return (
    <div className='bg-white round px-4 py-4 w-[40%]'>
      <h1 className='text-center font-semibold text-xl'>
      Add task
      </h1>
      <hr className='mb-4 mt-2' />
      <form className='flex flex-col gap-4'>
        <input type="text" className='border px-2 py-1 rounded border-zinc-300 outline-none' 
        placeholder='Title'
        name='title' value={values.title} onChange={change}/> 
        <div className='flex items-center justify-between gap-4'>
          <div className='w-full'>
            <h3 className='mb-2'>Select Priority</h3>
            <select name="priority" id="" className='border px-2 py-1 rounded border-zinc-300 outline-none w-full' onChange={change}><option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option></select>
          </div>
          <div className='w-full'>
            <h3 className='mb-2'>Select Status</h3>
            <select name="status" id="" className='border px-2 py-1 rounded border-zinc-300 outline-none w-full' onChange={change}><option value="pending">Pending</option>
            <option value="inprogress">InProgress</option>
            <option value="completed">Completed</option></select>
          </div>
        </div>
        <textarea name="description" placeholder='Description' id="" className='borde px-2 py-1 rounded border-zinc-300 outline-none h-[25vh]' value={values.description} onChange={change}></textarea>
        <div className='flex items-centerjustify-between gap-4'> 
          <button className='w-full bg-fuchsia-950 py-2 hover:bg-fuchsia-900 transition-all duration-300 text-white rounded' onClick={addtask}>Add Task</button>
          <button className='w-full border border-black py-2 hover:bg-fuchsia-200 transition-all duration-300 text-black rounded' onClick={()=>{
            setAddtaskdiv('hidden')
          }}>Cancel</button>
        </div>
      </form>
    </div>
  )
}

export default Addtask
