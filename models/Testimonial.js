import mongoose from 'mongoose';

const TestimonialSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide title'],
  },
  title: {
    type: String,
    required: [true, 'Please provide title'],
  },
  description: {
    type: String,
    required: [true, 'Please provide title'],
  },
  image: {
    type: String,
    required: [true, 'Please provide url'],
    unique: true,
  },
});

export default mongoose.model('Testimonial', TestimonialSchema);
