import React from 'react'

const Task = ({data}) => {
 const showedittaskmodal=(e,id)=>{
   e.preventDefault();
   window.sessionStorage.setItem('edittaskid',id);

   window.location.reload();
 }
  return (

      <button className='bg-white rounded px-4 w-[100%] py-2 hover: shadow-lg transition-all duration-300' onClick={(e)=>{
        showedittaskmodal(e,data._id);
      }}>
        <div className='flex items-center justify-between'>
          <h1 className=''>
            {data.title}
          </h1>
          <div 
          className={`text-sm
          
          ${data.priority==='low' ? "bg-blue-200 text-blue-800"
            :data.priority==='medium' ? 
            "bg-yellow-200 text-yellow-800":
             "bg-red-200 text-red-800"
          }
          
          
          px-2 rounded-full`} >
            <p>{data.priority}</p>
          </div>
        </div>
        <hr  className='my-2'/>
          <p className='text-sm text-black text-start'>{data.description}</p>
      </button>
  )
}

export default Task
