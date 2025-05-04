import React, { useEffect, useState } from 'react'
import Header from '../components/dashboard/Header'
import axios from 'axios'
import Addtask from '../components/dashboard/Addtask'
import Edittask from '../components/dashboard/Edittask'
import Pending from '../components/dashboard/Pending'
import Inprogress from '../components/dashboard/Inprogress'
import Completed from '../components/dashboard/Completed'
const Dashboard = () => {
  const [tasks,setTasks]=useState()
  const[Addtaskdiv,setAddtaskdiv]=useState('hidden')
  const [edittask,setEdittask]=useState('hidden')
  const [edittaskid,setEdittaskid]=useState()
  useEffect(()=>{
    const fetchdata=async()=>{
      try{
      const response=await axios.get('http://localhost:8000/api/auth/getuserdetails',{
        withCredentials:true
      })
      setTasks(response.data.tasks);
      
    }  
    catch(err){
      alert('error',err);
    } 
  };
  fetchdata();
  },[Addtaskdiv])
  useEffect(() => {
    const storedEditTaskId = window.sessionStorage.getItem('edittaskid');
    if (storedEditTaskId) {
      setEdittask('block');
      setEdittaskid(storedEditTaskId);
    }
  }, []);
  return (
    <div className='w-full relative'>
      <div className='bg-white'>
      <Header setAddtaskdiv={setAddtaskdiv}/>
      </div>
      <div className='px-12 py-4 flex gap-12 bg-zinc-100 min-h-[89vh] max-h[100%]'>
        <div className='w-1/3'><div className='border-b pb-2'>
          <h1 className='font-semibold text-zinc-800 text-center'>Pending</h1>
          <div className='pt-2'>
          {tasks?.pending && <Pending tasks={tasks.pending} />}
            </div></div></div>
        <div className='w-1/3'><div className='border-b pb-2'>
          <h1 className='font-semibold text-zinc-800 text-center'>Inprogress</h1>
          <div className='pt-2'>
          {tasks?.inprogress && <Inprogress tasks={tasks.inprogress} />}
            </div></div></div>
        <div className='w-1/3'><div className='border-b pb-2'>
          <h1 className='font-semibold text-zinc-800 text-center'>Completed</h1>
          <div className='pt-2'>
          {tasks?.completed && <Completed tasks={tasks.completed} />}
            </div></div></div>

      </div>
      <div className={`w-full ${Addtaskdiv} h-screen fixed top-0 left-0 bg-zinc-800 opacity-85`}>
      </div>
        <div className={`w-full ${Addtaskdiv} h-screen fixed top-0 left-0 flex items-center justify-center`}>
        <Addtask setAddtaskdiv={setAddtaskdiv}/>
        </div>

        <div className={`w-full ${edittask} h-screen fixed top-0 left-0 bg-zinc-800 opacity-85`}>
      </div>
        <div className={`w-full ${edittask} h-screen fixed top-0 left-0 flex items-center justify-center`}>
        <Edittask edittaskid={edittaskid} setEdittask={setEdittask}/>
        </div>
    </div>
  )
}

export default Dashboard
