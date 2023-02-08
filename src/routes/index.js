import express from 'express';
import appointmentRouter from './appointments.js';
import usersRouter from './users.js';
import serviceProvider from './serviceProvider.js';

const router = express.Router();

router.use('/appointments', appointmentRouter);
router.use('/provider', serviceProvider);
router.use('/users', usersRouter);

export default router;
