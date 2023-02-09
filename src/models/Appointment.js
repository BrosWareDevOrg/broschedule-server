import mongoose, { Schema } from 'mongoose';

const appointmentsSchema = new Schema({
  serviceProvider: { _id: false, type: Schema.Types.ObjectId, ref: 'ServiceProvider', required: true },
  client: { _id: false, type: Schema.Types.ObjectId, ref: 'Users',  required: true },
  day: { type: Date, required: true },
  hourIndex: { type: Number, required: true },
  expired: { type: Boolean, default: false },
});

export default mongoose.model('Appointments', appointmentsSchema);
