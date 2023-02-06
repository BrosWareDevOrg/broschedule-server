import mongoose from "mongoose";

const { Schema } = mongoose;

const serviceProviderSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  workDescription: {
    type: String,
    required: true
  },
  //Define an array of avaible days for work, default: [1, 2, 3, 4, 5] define an array of days between weekends day.
  avaibleDays: {
    type: Array,
    required: false
  },
  //If service provider work in fisical location, it must be declareted here, otherwise this field is allow to be empty
  location: {
    type: String,
    required: false
  },
  //Define number of minutes a session usually takes
  timeUnit: {
    type: Number,
    required: true
  },
  //Define an array of turns already occupied by users.
  turns: {
    type: Schema.Types.ObjectId,
    ref: 'Turn',
    required: true
  }
}, { timestamps: true });

export default mongoose.model('ServiceProvider', serviceProviderSchema);
