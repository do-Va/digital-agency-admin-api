import mongoose from 'mongoose';

const AboutSchema = new mongoose.Schema({
  title: {
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

export default mongoose.model('About', AboutSchema);
