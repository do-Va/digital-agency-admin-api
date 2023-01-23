import mongoose from 'mongoose';
import validator from 'validator';

const NewsLetterListSchema = new mongoose.Schema({
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
});

export default mongoose.model('NewsLetterList', NewsLetterListSchema);
