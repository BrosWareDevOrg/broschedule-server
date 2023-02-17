import Appointment from './models/Appointment.js';
import ServiceProviders from './models/ServiceProviders.js';
import User from './models/User.js';

export const sockets = (io) => {
  io.on('connection', (socket) => {
    console.log('User connected', socket.id);

    socket.on('client:confirmAppointment', async (data) => {
      try {
        const newAppointment = await Appointment.create(data);
        await User.updateOne(
          { _id: data.client },
          { $push: { appointments: newAppointment._id } }
        );
        await ServiceProviders.updateOne(
          { _id: data.serviceProvider },
          { $push: { appointments: newAppointment._id } }
        );
        socket.emit(
          'server:createAppointment',
          'Appointment registered successfully!'
        );
      } catch (error) {
        socket.emit(
          'server:createAppointment',
          error.message || error.details.message || error.toString()
        );
      }
    });
  });
};
