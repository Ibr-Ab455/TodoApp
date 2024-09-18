import React from 'react'

export default function TaskForm(props) {

  const { createTask, name, handleInputChange, isEdeting, updateTasks } = props

  return (
   <form className='flex my-2' onSubmit={isEdeting ? updateTasks : createTask}>
    <input type='text' placeholder='Add a Task' name='name' className='w-[60vh] px-2 py-1 text-gray-600 outline-none border-[1.5px] bg-transparent border-gray-400' value={name} onChange={handleInputChange}/>
    <button type='submit' className='bg-red-500 w-14 text-white'>{isEdeting ? "Edit" : "Add"}</button>
   </form>
  )
}
