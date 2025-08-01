import express from 'express'
import dotenv from 'dotenv'
dotenv.config({ quiet: true });
import mongoose from 'mongoose';
import cors from 'cors'
import publicRouter from './routes/public';
import internalRouter from './routes/internal';

const uri = process.env.MONGODB_URI || '';
export const app = express();
mongoose.connect(uri).then(() => console.log("MongoDB connected")).catch((err) => console.log("Error connecting to MongoDB:", err));
app.use(express.json());
app.use(cors())
app.use('/public', publicRouter);
app.use('/internal', internalRouter);