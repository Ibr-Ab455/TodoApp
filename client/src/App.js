import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import TaskList from './components/TaskList'

export default function App() {
  return (
    <div className='bg-blue-500 w-full h-[100vh] pt-[13%]'>
      <div className='w-[35%] h-full flex  bg-[#eee] rounded-md mx-auto p-4'>
      <TaskList/>
      </div>
      <ToastContainer />
    </div>
    
  )
}
