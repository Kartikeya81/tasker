import React from 'react'
import Task from './Task'
const Completed = ({tasks}) => {
  return (
     <div className='flex flex-col gap-2'>
          {tasks.map((task) => {
      return <Task key={task._id} data={task} />;
    })}
        </div>
  )
}

export default Completed
