const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  size: {
    xs: {
      type: Boolean, 
      default: false
    },
    s: {
      type: Boolean, 
      default: false
    }, 
    m: {
      type: Boolean, 
      default: false
    },
    l: {
      type: Boolean, 
      default: false
    },
    xl: {
      type: Boolean, 
      default: false
    }
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['Shirt', 'Trousers']
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Seller',
    //required: true
  },
  feedback: [{
    rating: Number,
    comments: String 
  }],
  stars: {
    type: Number
  }
});

const Product = mongoose.model('Product', productSchema);
 
module.exports = Product;
