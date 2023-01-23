import mongoose from 'mongoose';

const MenuSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide title'],
    unique: true,
  },
  url: {
    type: String,
    required: [true, 'Please provide url'],
    unique: true,
  },
});

export default mongoose.model('Menu', MenuSchema);
