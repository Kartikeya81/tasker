import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState} from 'react' 
import axios from 'axios'
const Login = () => {
 const navigate=useNavigate();
 const [logininfo,setLogininfo]=useState({
            email:'',
            password:''

      })

      const handlechange=(e)=>{
        const {name,value} = e.target;
        const copylogininfo={...logininfo};
        copylogininfo[name]=value;
        setLogininfo(copylogininfo);
      }

const login=async(e)=>{
          e.preventDefault();
          try {
            const response = await axios.post('http://localhost:8000/api/auth/login', logininfo,{
              withCredentials: true,
            });
            const token =response.data.token; //Just for testing purpose
            console.log(token);
            localStorage.setItem('userLoggedIn','yes');
            navigate('/dashboard');
  
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
          Login to your account
        </h3>

      </div>
      <div className='w-[60vw] md:w-[50vw] lg:w-[30vw] mt-4'>
        <form action="" className='flex flex-col gap-4'>
          <input type="email" placeholder='Email' className='border rounded px-4 py-1 border-zinc-400 w-[100%] outline-none' name='email' value={logininfo.email} onChange={handlechange}/>
          <input type="password" placeholder='Password' className='border rounded px-4 py-1 border-zinc-400 w-[100%] outline-none' name='password'value={logininfo.password} onChange={handlechange}/>
          <button className='bg-fuchsia-950 text-white font semibold py-2 rounded hover:bg-fuchsia-800 transition-all duration-300' onClick={login}
          >Login</button>
          <p className='text-center font-bold text-black'>Don't  have an account ? <Link to={'/signup'}>Signup</Link></p>
        </form>
      </div>
    </div>
  )
}

export default Login
