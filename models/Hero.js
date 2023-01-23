import mongoose from 'mongoose';

const HeroSchema = new mongoose.Schema({
  title: {
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

export default mongoose.model('Hero', HeroSchema);
