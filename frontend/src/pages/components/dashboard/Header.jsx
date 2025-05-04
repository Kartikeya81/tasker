import axios from 'axios'
import React from 'react'
import {IoLogOutOutline} from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
const Header = ({setAddtaskdiv}) => {
  const navigate=useNavigate();
  const logout=async ()=>{
   try{
      const res=await axios.post('http://localhost:8000/api/auth/logout',{},{
        withCredentials:true
      });
      localStorage.clear('userLoggedIn');
      navigate('/login');
   }
   catch(err){
    navigate('/login');
   }
  }
  return (
    <div className='flex px-12 py-4 items-center justify-between border-b'>
      <div>
        <h1 className='text-2xl font-bold text-fuchsia-950'>
          Tasker
        </h1>
      </div>
      <div className='flex gap-8'>
        <button className='bg-fuchsia-950 text-white font-semibold px-4 py-2 rounded hover:bg-fuchsia-800 transition-all duration-300' onClick={()=>{
          setAddtaskdiv('flex')
        }}>
        Add Task
        </button>
        <button className='text-2xl hover:text-neutral-950 transition-all duration-300' onClick={logout}>
        <IoLogOutOutline/>
        </button>
      </div>
    </div>
  )
}

export default Header
