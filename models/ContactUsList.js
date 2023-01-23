import mongoose from 'mongoose';
import validator from 'validator';

const ContactUsListSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide title'],
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    validate: {
      validator: validator.isEmail,
      message: 'Please provide a valid email',
    },
    unique: true,
  },
  message: {
    type: String,
    required: [true, 'Please provide url'],
  },
});

export default mongoose.model('ContactUsList', ContactUsListSchema);
