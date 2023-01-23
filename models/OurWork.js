import mongoose from 'mongoose';

const OurWorkSchema = new mongoose.Schema({
  image: {
    type: String,
    required: [true, 'Please provide title'],
  },
  alt: {
    type: String,
    required: [true, 'Please provide title'],
  },
  category: {
    type: String,
    enum: ['Illustration', 'App', 'Branding'],
    default: 'Illustration',
  },
});

export default mongoose.model('OurWork', OurWorkSchema);
