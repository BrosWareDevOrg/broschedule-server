import mongoose, { Schema } from 'mongoose';

const appointmentsSchema = new Schema({
  serviceProvider: { _id: false, type: Schema.Types.ObjectId, required: true },
  client: { _id: false, type: Schema.Types.ObjectId, required: true },
  day: { type: Date, required: true },
  hour: { type: String, required: true },
  expired: { type: Boolean, default: false },
});

export default mongoose.model('Appointments', appointmentsSchema);
