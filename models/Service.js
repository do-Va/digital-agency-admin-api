import mongoose from 'mongoose';

const ServiceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide title'],
  },
  title2: {
    type: String,
    required: [true, 'Please provide title'],
  },
  description: {
    type: String,
    required: [true, 'Please provide title'],
  },
  buttonContent: {
    type: String,
    required: [true, 'Please provide title'],
  },
  image: {
    type: String,
    required: [true, 'Please provide url'],
  },
});

export default mongoose.model('Service', ServiceSchema);
