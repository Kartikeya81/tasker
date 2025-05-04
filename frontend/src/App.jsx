import React, { useEffect } from 'react'
import {Routes,Route, useNavigate} from 'react-router-dom'
import Signup from '../src/pages/Auth/Signup'
import Login from '../src/pages/Auth/Login'
import Dashboard from './pages/Admin/Dashboard'
const App = () => {
  const navigate=useNavigate();
  useEffect(()=>{
      if(localStorage.getItem('userLoggedIn')){
        navigate('/dashboard');
      }
      else{
        navigate('/login');
      }
  },[])
  return (<>
  <Routes>
    <Route path='/signup' element={<Signup/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/dashboard' element={<Dashboard/>}/>
    <Route/>
  </Routes>
  
  </>)  
  
}

export default App
