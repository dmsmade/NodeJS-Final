import mongoose from 'mongoose';

const shipmentSchema = new mongoose.Schema({
  ref: String,
  origin: {
    contact: {
      name: String,
      email: String,
      phone: String
    },
    address: {
      country_code: String,
      locality: String,
      postal_code: Number,
      address_line1: String,
      organisation: Boolean
    }
  },
  destination: {
    contact: {
      name: String,
      email: String,
      phone: String
    },
    address: {
      country_code: String,
      locality: String,
      postal_code: Number,
      address_line1: String,
      organisation: Boolean 
    }     
  },
  package: {
    dimensions: {
      height: Number,
      width: Number,
      length: Number,
      unit: String  
    },
    gross_weight: {
      amount: Number,
      unit:String
    }
  }
});

export default mongoose.model('Shipment', shipmentSchema);