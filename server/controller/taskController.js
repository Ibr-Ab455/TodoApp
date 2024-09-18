import Task from "../model/taskModel.js";

// create task
export const createTask = async(req, res) => {
 try{
    const task = await Task.create(req.body);
    res.status(200).json({
     message: "successfull",
     data: {
      task
     }
    })
 }catch (error) {
    res.status(500).json({ msg: error.message});
 }
}

export const getAllTask = async (req, res) => {
   try{
      const tasks = await Task.find();
      res.status(200).json(tasks)
   }catch (error) {
    res.status(500).json({ msg: error.message});
   }
}


// get single task
export const getTasks = async(req, res) => {
    try{
       const { id } = req.params;
       const task = await Task.findById(id);
       if(!task) {
        return res.status(404).json(`No task with id: ${id}`)
       }
       res.status(200).json(task)
 }catch (error) {
       res.status(500).json({ msg: error.message});
 }
 }

//  delet task

export const deletTask = async(req, res) => {
    try{
     const { id } = req.params;
     const task = await Task.findByIdAndDelete(id);
     if(!task) {
        return res.status(404).json(`No task with id: ${id}`)
    }
    res.status(200).send("Delet task")
 }catch (error) {
       res.status(500).json({ msg: error.message});
 }
 }


//  update task

export const updateTask = async (req, res) => {
  try{
    const { id } = req.params
    const task = await Task.findByIdAndUpdate(
        {_id: id}, req.body, {new: true}
    )

    res.status(200).json(task)
 }catch (error) {
    res.status(500).json({ msg: error.message});
  }
}