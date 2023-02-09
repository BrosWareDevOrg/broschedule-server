import express from 'express';
import {
  getAppointments,
  getAppointmentById,
  updateAppointment,
  createAppointment,
  deleteAppointment,
} from '../controllers/appointments.js';
import {
  appointmentsCreateValidation,
  appointmentsEditValidation,
} from '../validations/appointment.js';
const router = express.Router();

router
  .get('/', getAppointments)
  .get('/:id', getAppointmentById)
  .post('/', appointmentsCreateValidation, createAppointment)
  .put('/:id', appointmentsEditValidation, updateAppointment)
  .delete('/:id', deleteAppointment);

export default router;
