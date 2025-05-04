import React, { useEffect } from 'react'
import {useState} from 'react'
import axios from 'axios'
const Edittask = ({setEdittask,edittaskid}) => {
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
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/tasks/gettask/${edittaskid}`,
          {
            withCredentials: true,
          }
        );
        console.log(res.data.taskdetail);
        setValues(res.data.taskdetail);
      } catch (error) {
        console.error('error',error)
      }
    };
    fetch();
  }, [edittaskid]);
  
  
  const edittask = async (e,id)=>{
    e.preventDefault();
    try{
        const response=await axios.put(`http://localhost:8000/api/tasks/updatetask/${id}`,values,{
          withCredentials:true,
        })
        window.sessionStorage.clear('edittaskid')
        setEdittask('hidden');
        window.location.reload();
    }
    catch(err){
      alert('Error while editing task')
      console.log(err);
    }
  }
  const deletetask = async (e,id)=>{
    e.preventDefault();
    try{
        const response=await axios.delete(`http://localhost:8000/api/tasks/deletetask/${id}`,{
          withCredentials:true,
        })
        window.sessionStorage.clear('edittaskid')
        setEdittask('hidden');
        window.location.reload();
    }
    catch(err){
      alert('Error while deleting task')
      console.log(err);
    }
  }

  return (
    <div className='bg-white round px-4 py-4 w-[40%]'>
    <h1 className='text-center font-semibold text-xl'>
    Edit task
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
        <button className='w-full bg-fuchsia-950 py-2 hover:bg-fuchsia-900 transition-all duration-300 text-white rounded' onClick={(e)=>edittask(e,values._id)}>Edit Task</button>
        <button className='w-full border border-black py-2 hover:bg-fuchsia-300 transition-all duration-300 text-black rounded ' onClick={(e)=>deletetask(e,values._id)}>Delete</button>
        <button className='w-full border border-black py-2 hover:bg-fuchsia-300 transition-all duration-300 text-black rounded' onClick={(e)=>{
            e.preventDefault();
            window.sessionStorage.clear('editaskid')
            setEdittask('hidden')
          }}>Cancel</button>
      </div>
    </form>
  </div>
  )
}

export default Edittask
