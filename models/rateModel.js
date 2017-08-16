import mongoose from 'mongoose';

const rateSchema = new mongoose.Schema({
  weight: Number,
  price: Number,
  fromcountry: String,
  tocountry: String
});

export default mongoose.model('Rate', rateSchema);
