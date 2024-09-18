import React from 'react'
import { FaEdit, FaCheckDouble, FaRegTrashAlt } from "react-icons/fa";

export default function Task(props) {

    const { task, index, deletTask, getSingleTask, completedTask } = props

  return (
    <div className='flex justify-between py-1 bg-gray-300 my-4'>
      <p className={`${task.completed ? "relative after:absolute after:w-[4px] after:bg-green-500 after:h-8 after:left-[-4px] after:top-[-4px" : "relative before:absolute before:w-[4px] before:bg-red-500 before:h-8 before:left-[-4px] before:top-[-4px" }`}>
        <b>{index + 1}</b>
        {task.name}
      </p>
      <div className='flex space-x-2 mr-2 mt-1 cursor-pointer'>
        <FaCheckDouble color='green' onClick={() => completedTask(task)}/>
        <FaEdit color='purple' onClick={() => getSingleTask(task)}/>
        <FaRegTrashAlt color='red' onClick={() => deletTask(task._id)}/>
      </div>
    </div>
  )
}
