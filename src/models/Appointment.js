import mongoose, { Schema } from 'mongoose';

const appointmentsSchema = new Schema({
  serviceProviders: { type: Array, required: true },
  client: { type: String, required: true },
  day: { type: Date, required: true },
  hour: { type: String, required: true },
  expired: { type: Boolean },
});

export default mongoose.model('Appointments', appointmentsSchema);
