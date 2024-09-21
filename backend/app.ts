import express from 'express';
import cors from 'cors';
import applicantRoutes from './routes/applicantRoutes';
import { connectDB } from './config/dbConfig';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api', applicantRoutes);

// DB Connection
connectDB();

export default app;
