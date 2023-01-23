import mongoose from 'mongoose';

const ServiceListSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide title'],
  },
  description: {
    type: String,
    required: [true, 'Please provide title'],
  },
});

export default mongoose.model('ServiceList', ServiceListSchema);
