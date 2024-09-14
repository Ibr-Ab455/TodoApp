import express from 'express'
import dotenv from 'dotenv'
import bodyParse from 'body-parse'
import cors from 'cors'
import connectDB from './config/mongoDB.js';
import taskRoutes from './routes/taskRoutes.js'

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// routes
app.use("/api/task", taskRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
 console.log(`Server running on port ${PORT}`)
})