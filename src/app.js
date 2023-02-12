import cors from "cors";
import path from 'path';
import express from "express";
import dotenv from 'dotenv';
import router from "./routes/index.js";

dotenv.config();

export const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(path.join('src', 'public')))
app.use('/api', router);
