const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  address: [{
    street: String,
    city: String,
    state: String,
    zip: String
  }],
  orders: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order'
  }],
  cart:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }]
}, { timestamps: true });

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;


/*
(async function createCustomer(){
    let newCustomer = {
        "firstName": "John",
        "lastName": "Doe",
        "email": "johndoe@example.com",
        "password": "secret",
        "address": [{
            "street": "123 Main St",
          "city": "Anytown",
            "state": "CA",
            "zip": "12345"
        }],
    };
    let data = await Customer.create(newCustomer);
    console.log(data);
})();
*/