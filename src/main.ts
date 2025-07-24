import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import publicRouter from './routes/public';
import internalRouter from './routes/internal';

dotenv.config({ quiet: true });
const uri = process.env.MONGODB_URI || '';
const port = process.env.PORT || 3000;
const app = express();
mongoose.connect(uri).then(() => console.log("MongoDB connected")).catch((err) => console.log("Error connecting to MongoDB:", err));
app.use(express.json());

app.use('/public', publicRouter);
app.use('/internal', internalRouter);

app.listen(port, () => {
    console.log("App running on port:\x1b[32m", port, "\x1b[0m");
})