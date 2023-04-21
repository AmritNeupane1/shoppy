const express = require('express');
const mongoose = require('mongoose');
const Product = require("./product");
const Customer = require("./customer");
const Order = require('./order');
const cookieParser = require('cookie-parser');

const orderRouter = express.Router();

orderRouter
    .route('/:id')
    .get(placeOrder);

async function placeOrder(req, res){
    try{
        console.log(req.cookies.customerID);
        const order = {
            customer: req.cookies.customerID,
            products: [req.params.id],
            status: 'pending',
        }
        let data = await Order.create(order);
        const customer = await Customer.findOne({ _id: data.customer });
        customer.orders.push(data._id);
        await customer.save();
        res.send(data);
    }
    catch(err){
        console.log(err);
        res.send("Failed !");
    }
}



module.exports = orderRouter;


/*productRouter
    .route('/productPage')
    .get(getProductPageInfo);



async function getInfo(req, res){
    try{
        const product = await Product.lim(20);
        console.log(product);
        res.send(product);
    } catch(err){
        console.log(err);
        res.send('It was me, DIO.');
    }
}

async function getProductPageInfo(req, res){
    try{
        const productID = req.body.productID;
        const product = await Product.find({_id: productID});
        console.log(product);
        res.send(product);
    } catch(err){
        console.log(err);
        res.send('It was me, DIO.');
    }
}
*/


