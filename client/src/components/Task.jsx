import React from 'react'
import { FaEdit, FaCheckDouble, FaRegTrashAlt } from "react-icons/fa";

export default function Task({ task, index }) {
  return (
    <div className='flex justify-between py-1 bg-gray-300 my-4'>
      <p className='relative after:absolute after:w-[4px] after:bg-red-500 after:h-8 after:left-[-4px] after:top-[-4px]'>
        <b>{index + 1}</b>
        {task.name}
      </p>
      <div className='flex space-x-2 mr-2 mt-1 cursor-pointer'>
        <FaCheckDouble color='green'/>
        <FaEdit color='purple'/>
        <FaRegTrashAlt color='red'/>
      </div>
    </div>
  )
}
