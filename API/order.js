const mongoose = require('mongoose');
const Customer = require('./customer')
const Product = require('./product')

const orderSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered'],
    default: 'pending'
  },
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    zip: String
  },
  totalAmount: {
    type: Number,
    //required: true
  }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;

/*
(async function createOrder(){
    let newOrder = {
        "customer": "",
        "seller" : ""
        "products": [
            {
              "name": "Widget",
              "price": 9.99,
              "quantity": 2
            },
            {
              "name": "Gadget",
              "price": 19.99,
              "quantity": 1
            }
        ],
        "status": "processing",
        "shippingAddress": {
            "street": "456 Elm St",
            "city": "Anytown",
            "state": "CA",
            "zip": "12345"
        },
        "totalAmount": 39.97,
    };
    let data = await Orders.create(newOrder);
    console.log(data);
})();
*/