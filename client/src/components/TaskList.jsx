import React, { useEffect, useState } from 'react'
import TaskForm from './TaskForm'
import Task from './Task'
import { toast } from 'react-toastify'
import axios from 'axios'
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function TaskList() {
  
    const [tasks, setTasks] = useState([]);
    const [completedTasks, setCompletedTask] = useState([]);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
     name: "",
     completed: false
    })

    const {name} = formData

    const handleInputChange = (e) => {
      const {name, value} = e.target
      setFormData({ ...formData, [name]: value})
    };

    const getTask = async () => {
        setLoading(true)
   
        try{
          const {data} =  await axios.get("/api/task/tasks");
            setTasks(data)
           setLoading(false)
        }catch (err){
          toast.error(err.message)
          console.log(err);
          setLoading(false)
        }
       }
   
       useEffect(() => {
          getTask();
       }, [])

    const createTask = async (e) => {
     e.preventDefault();
     if(name === ""){
        return toast.error("Input field cannot be empty")
     }

     try{
      await axios.post("/api/task/create", formData);
      toast.success("Task added successfully")
      setFormData({ ...formData, name: ""});
     }catch (err){
     toast.error(err.message)
     console.log(err)
     }
    }

    

  return (
    <div className=''>
      <h2>Task Manager</h2>
      <TaskForm name={name} handleInputChange={handleInputChange} createTask={createTask}/>
      <div className='flex justify-between'>
        <p className='text-sm text-gray-500'>
            <b className='text-gray-600 mr-1'>Total Tasks:</b>0
        </p>
        <p className='text-sm text-gray-500'>
          <b className='text-gray-600 mr-1'>Completed Tasks:</b>0
        </p>
      </div>
      <hr/>
      {loading && (
        <div className='flex justify-center items-center'>
           <AiOutlineLoading3Quarters className='tex-3xl text-red-500 my-2'/>  
        </div>
      )}
      {
        !loading && tasks.length === 0 ? (
         <p>No task added. Please</p>
        ) : 
        (
         <>
          {tasks.map((task, index) => {
            return  <Task key={task._id} task={task} index={index}/>
          })}
         </>
        )

      }
     
    </div>
  )
}
