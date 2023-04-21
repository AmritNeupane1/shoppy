const express = require('express');
const mongoose = require('mongoose');
const Product = require("./product");
const Seller = require('./seller.js');
const cookieParser = require('cookie-parser');

const sellerRouter = express.Router();

sellerRouter
    .route("/signup")
    .get(getSignup)
    .post(postSignup);

sellerRouter
    .route("/signin")
    .get(getSignin)
    .post(postSignin);

sellerRouter
    .route("/profile")
    .get(getInfo)
    .put(addProduct);





async function getSignup(req, res){
    res.send(" Ho! you are approaching me.");
}

async function postSignup(req, res){
    try{
        const newSeller = req.body;
        let data = await Seller.create(newSeller);
        res.cookie('sellerID', data._id, {maxAge: 1000*60*60*24 ,httpOnly: true});
        res.send(" The World");
    } catch(err){
        console.log(err);
        res.send(" Yare Yare");
    }
}




async function getSignin(req, res){
    console.log(req.cookies);
    res.send(" Ho! you are approaching me.");
}

async function postSignin(req, res){
    const data = req.body;
    try{
        const seller = await Seller.findOne({ email: data.email, password: data.password });
        if (!customer) {
            console.log('User not found');
            res.send("Invalid Credentials");
            //return;
        }
        res.cookie('sellerID', seller._id, {maxAge: 1000*60*60*24 ,httpOnly: true});
        res.send(seller);
        console.log(seller);
    } catch(err){
        console.log(err);
        return;
    }
}



async function getInfo(req, res){
    try{
        const id = req.cookies.sellerID;
        const seller = await Seller.findOne({ _id: id });
        if (!seller) {
            console.log('User not found');
            res.send("Invalid Credentials");
            return;
        }
        console.log(seller);
        res.send(seller);
    } catch(err){
        console.log(err);
        console.log(req.cookies);
        res.send('It was me, DIO.');
        return;
    }
}

async function addProduct(req, res){
    try{
        const id = req.cookies.sellerID;
        const seller = await Seller.findOne({ _id: id });
        if (!seller) {
            console.log('User not found');
            res.send("Invalid Credentials");
            return;
        }
        seller.address.push(req.body);
        const data = await customer.save();
        console.log(customer);
        res.send(customer);
    } catch(err){
        console.log(err);
        console.log(req.cookies);
        res.send('It was me, DIO');
        return;
    }
}

module.exports = sellerRouter;



/*
sellerRouter
    .route('/seller/productInfo')
    .get(getSellerProductInfo)
    .post(putSellerProductInfo);

async function getSellerProductInfo(req, res){
    const id = req.cookies.sellerID;
    try{
        const product = await Product.find({seller: id});
        console.log(product);
        res.send(product);
    } catch(err){
        console.log(err);
        res.send('It was me, DIO.');
    }
}
*/