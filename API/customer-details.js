const express = require('express');
const mongoose = require('mongoose');
const Customer = require("./customer");
const cookieParser = require('cookie-parser');


const customerRouter = express.Router();

customerRouter
    .route("/signup")
    .get(getSignup)
    .post(postSignup);

customerRouter
    .route("/signin")
    .get(getSignin)
    .post(postSignin);

customerRouter
    .route("/profile")
    .get(getInfo)
    .put(putInfo);




async function getSignup(req, res){
    res.send(" Ho! you are approaching me.");
}

async function postSignup(req, res){
    try{
        const newCustomer = req.body;
        let data = await Customer.create(newCustomer);
        res.cookie('customerID', data._id, {maxAge: 1000*60*60*24 ,httpOnly: true});
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
        const customer = await Customer.findOne({ email: data.email, password: data.password });
        if (!customer) {
            console.log('User not found');
            res.send("Invalid Credentials");
            return;
        }
        res.cookie('customerID', customer._id, {maxAge: 1000*60*60*24 ,httpOnly: true});
        res.send(customer);
        console.log(customer);
    } catch(err){
        console.log(err);
        return;
    }
}


async function getInfo(req, res){
    try{
        const id = req.cookies.customerID;
        const customer = await Customer.findOne({ _id: id });
        if (!customer) {
            console.log('User not found');
            res.send("Invalid Credentials");
            return;
        }
        console.log(customer);
        res.send(customer);
    } catch(err){
        console.log(err);
        console.log(req.cookies);
        res.send('Your underwear is visible.');
        return;
    }
}

async function putInfo(req, res){
    console.log('It was me, DIO')
    try{
        const id = req.cookies.customerID;
        const customer = await Customer.findOne({ _id: id });
        if (!customer) {
            console.log('User not found');
            res.send("Invalid Credentials");
            return;
        }
        customer.address.push(req.body);
        const data = await customer.save();
        console.log(customer);
        res.send(customer);
    } catch(err){
        //console.log(err);
        //console.log(req.cookies);
        res.send('Your underwear is visible.');
        return;
    }
}

module.exports = customerRouter;



/*
{
        "firstName": "Johny",
        "lastName": "Joestar",
        "email": "spin@example.com",
        "password": "secret",
        "address": {
            street: "123 Main St",
            city: "Anytown",
            state: "CA",
            zip: "12345",
        }
}
*/