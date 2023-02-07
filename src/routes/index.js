import express from 'express';
import appointmentRouter from './appointments.js';
const router = express.Router();

router.use('/appointments', appointmentRouter);

export default router;
