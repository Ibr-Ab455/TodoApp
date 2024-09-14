import express from 'express'
import { createTask, deletTask, getTasks, updateTask } from '../controller/taskController.js';

const router = express.Router();

router.post("/create", createTask);
router.get("/tasks/:id", getTasks);
router.delete("/delet/:id", deletTask);
router.put("/update/:id", updateTask)

export default router;