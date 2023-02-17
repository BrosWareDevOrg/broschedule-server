import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import router from './routes/index.js';

dotenv.config();

export const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', router);
