import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
    name: { type: String, required: true},
    lastName: { type: String, required: true},
    phone: { type: String, required: true},
    email: { type: String, required: true},
    isActive: { type: Boolean, default: false},
    appointment: { type: Array, required: true }
});

export default mongoose.model('Users', userSchema);