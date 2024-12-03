import mongoose from 'mongoose';

const PropSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name for the prop'],
    maxlength: [100, 'Name cannot be more than 100 characters'],
  },
  price: {
    type: Number,
    required: [true, 'Please specify a price'],
  },
  image_url: {
    type: String,
    required: [true, 'Please provide an image URL'],
  },
  category: {
    type: String,
    required: [true, 'Please specify a category'],
  },
  subcategory: {
    type: String,
    required: [true, 'Please specify a subcategory'],
  },
  quantity: {
    type: Number,
    required: [true, 'Please specify quantity'],
    min: [0, 'Quantity cannot be negative'],
  },
  dimensions: {
    type: String,
    required: [true, 'Please specify dimensions'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
});

export default mongoose.models.Prop || mongoose.model('Prop', PropSchema); 