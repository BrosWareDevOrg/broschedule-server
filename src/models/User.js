import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  appointments: [
    {
      _id: false,
      type: Schema.Types.ObjectId,
      ref: 'Appointments',
      required: false,
    }
  ],
}, { timestamps: true });

export default mongoose.model('Users', userSchema);
