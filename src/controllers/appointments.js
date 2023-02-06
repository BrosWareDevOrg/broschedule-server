import Appointments from '../models/Appointment';

export const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointments.find({});
    if (!appointments.length) {
      return res.status(404).json({
        message: 'Appointments not found',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Appointments retrieved successfully',
      data: appointments,
      error: false,
    });
  } catch (err) {
    return res.status(400).json({
      message: error || 'Error retrieving appointments',
      data: undefined,
      error: true,
    });
  }
};

export const getAppointmentById = async (req, res) => {
  try {
    const id = req.params.id;
    const appointment = await Appointments.findById(id);
    if (!appointment) {
      return res.status(404).json({
        message: 'Appointment not found',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Appointment retrieved successfully',
      data: appointment,
      error: false,
    });
  } catch (err) {
    return res.status(400).json({
      message: error || 'Error retrieving appointment',
      data: undefined,
      error: true,
    });
  }
};

export const createAppointment = async (req, res) => {
  try {
    const appointment = new Appointments(req.body);
    const result = await appointment.save();
    return res.status(201).json({
      message: 'Appointment created successfully!',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: error || 'Appointment creation failed',
      data: undefined,
      error: true,
    });
  }
};

export const deleteAppointment = async (req, res) => {
  try {
    const id = req.params.id;
    const appointment = await Appointments.findByIdAndRemove(id);
    if (!appointment) {
      return res.status(404).json({
        message: 'Appointment not found',
        data: undefined,
        error: true,
      });
    }
    return res.status(204).json();
  } catch (err) {
    return res.status(400).json({
      message: error || 'Error deleting appointment',
      data: undefined,
      error: true,
    });
  }
};

export const updateAppointment = async (req, res) => {
  try {
    const id = req.params.id;
    const appointment = await Appointments.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    if (!appointment) {
      return res.status(404).json({
        message: 'Appointment not found',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Appointment updated successfully',
      data: appointment,
      error: false,
    });
  } catch (err) {
    return res.status(400).json({
      message: error || 'Error updating appointment',
      data: undefined,
      error: true,
    });
  }
};
