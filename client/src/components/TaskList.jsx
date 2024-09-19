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
    const [isEdeting, setIsEdeting] = useState(false);
    const [taskId, setTaskId] = useState("");

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
      getTask();
     }catch (err){
     toast.error(err.message)
     console.log(err)
     }
    }

    const deletTask = async (id) => {
     try{
        await axios.delete(`api/task/delet/${id}`)
        getTask();
    }catch (err) {
      toast.error(err.message)
      console.log(err)
     }
    }

    useEffect(() => {
     const ctask = tasks.filter((task) => {
     return task.completed === true
     })

     setCompletedTask(ctask)
    }, [tasks])

    const getSingleTask = async (task) => {
      setFormData({name: task.name, completed: false});
      setTaskId(task._id);
      setIsEdeting(true);
    }

    const updateTasks = async (e) => {
      e.preventDefault();

      if(name === ""){
       return toast.error("Input field cannot be empty")
     }

     try{
        await axios.put(`api/task/update/${taskId}`, formData);
        setFormData({ ...formData, name: "" });
        toast.success("task update successfully")
        setIsEdeting(false);
        getTask();
     
    }catch (err) {
        toast.error(err.message)
        console.log(err)
       }
    }


    const completedTask = async (task) => {
     const newFormData = {
       name: task.name,
      completed: true,
     }

     try{
        await axios.put(`api/task/update/${task._id}`, newFormData);
        getTask();
     }catch (err){
      toast.error(err.message)
     }
    }

    

  return (
    <div className=''>
      <h2 className='text-xl font-semibold mb-2'>Task Manager</h2>
      <TaskForm name={name} handleInputChange={handleInputChange} createTask={createTask} isEdeting={isEdeting} updateTasks={updateTasks}/>
      
        {tasks.length > 0 && (
        <div className='flex justify-between mt-4'>
          <p className='text-sm text-gray-500'>
          <b className='text-gray-600 mr-1'>Total Tasks:</b>{tasks.length}
      </p>
      <p className='text-sm text-gray-500'>
        <b className='text-gray-600 mr-1'>Completed Tasks:</b>{completedTasks.length}
      </p>
    </div>
        )

        }
       
      <hr />
      {loading && (
        <div className='flex justify-center items-center'>
         <AiOutlineLoading3Quarters className='text-3xl text-red-500 my-2'/>  
        </div>
      )}
      {
        !loading && tasks.length === 0 ? (
         <p>No task added. Please add a task</p>
        ) : 
        (
         <>
          {tasks.map((task, index) => {
            return  <Task key={task._id} task={task} index={index} deletTask={deletTask} getSingleTask={getSingleTask} completedTask={completedTask}/>
          })}
         </>
        )

      }
     
    </div>
  )
}
