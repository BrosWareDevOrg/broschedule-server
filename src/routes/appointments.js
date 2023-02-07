import express from 'express';
import {
  getAppointments,
  getAppointmentById,
  updateAppointment,
  createAppointment,
  deleteAppointment,
} from '../controllers/appointments.js';
const router = express.Router();

router
  .get('/', getAppointments)
  .get('/:id', getAppointmentById)
  .post('/', createAppointment)
  .put('/:id', updateAppointment)
  .delete('/:id', deleteAppointment);

export default router;
