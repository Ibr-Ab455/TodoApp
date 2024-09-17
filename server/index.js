import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/mongoDB.js';
import taskRoutes from './routes/taskRoutes.js'
import cors from 'cors'

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

// routes
app.use("/api/task", taskRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
 console.log(`Server running on port ${PORT}`)
})