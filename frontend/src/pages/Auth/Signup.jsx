import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState} from 'react'
import axios from 'axios'
const Signup = () => {
const navigate=useNavigate();
      const [signupinfo,setSignupinfo]=useState({
            username:'',
            email:'',
            country:'',
            password:''

      })
      const handlechange=(e)=>{
        const {name,value} = e.target;
        const copysignupinfo={...signupinfo};
        copysignupinfo[name]=value;
        setSignupinfo(copysignupinfo);
      }
      const register=async(e)=>{
        e.preventDefault();
        try {
          const response = await axios.post('http://localhost:8000/api/auth/register', signupinfo);
          navigate('/login');

        } catch (error) {
          console.log(error); // Handle error response
        }
      }

  return (
    <div className='flex h-screen flex-col items-center justify-center'>
      <div className='w-[60vw] md:w-[50vw] lg:w-[30vw]'>
        <h1 className='text-3xl font-bold text-center mb-2 text-black'>
          Tasker
        </h1>
        <h3 className='text-center font-semibold text-xinc-900'>
          Create an account to get started
        </h3>

      </div>
      <div className='w-[60vw] md:w-[50vw] lg:w-[30vw] mt-4'>
        <form  className='flex flex-col gap-4'>
          <input type="text" placeholder='Username' className='border rounded px-4 py-1 border-zinc-400 w-[100%] outline-none' name='username'  autoFocus values={signupinfo.username} onChange={handlechange}/>
          <input type="email" placeholder='Email' className='border rounded px-4 py-1 border-zinc-400 w-[100%] outline-none' name='email' values={signupinfo.email} onChange={handlechange}/>
          <input type="text" placeholder='Country' className='border rounded px-4 py-1 border-zinc-400 w-[100%] outline-none' name='country' values={signupinfo.country} onChange={handlechange}/>
          <input type="password" placeholder='Password' className='border rounded px-4 py-1 border-zinc-400 w-[100%] outline-none' name='password' values={signupinfo.password} onChange={handlechange}/>
          <button className='bg-fuchsia-950 text-white font semibold py-2 rounded hover:bg-fuchsia-800 transition-all duration-300' onClick={register}>Register</button>
          <p className='text-center font-bold text-black'>Already have an account ? <Link to={'/login'}>Login</Link></p>
        </form>
      </div>
    </div>
  )
}

export default Signup
