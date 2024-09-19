import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/mongoDB.js';
import taskRoutes from './routes/taskRoutes.js'
import cors from 'cors'
import path from 'path'

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

// routes
app.use("/api/task", taskRoutes);

app.use(express.static(path.join(_dirname, '/client/dist')));

app.use('*', (req, res) => {
 res.sendFile(path.join(_dirname, 'client', 'dist', 'index.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
 console.log(`Server running on port ${PORT}`)
})