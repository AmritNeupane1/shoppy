const express = require('express');
const mongoose = require('mongoose');
const Customer = require("./customer");
const Orders = require('./order');
const customerRouter = require('./customer-details');
const productRouter = require('./product-details');

const cookieParser = require('cookie-parser');

const app = express();
app.listen(3001);

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res)=>{
    res.send("I, Giorno Giovana have a Dream.")
});


app.use("/customer", customerRouter);
app.use("/home", productRouter);



const http = require('http');

const server = http.createServer((req, res)=>{
    console.log("Request has been made");
    res.setHeader('content-type', 'text/plain');
    res.write("OK");
    console.log("ok");
    res.end();
});

server.listen(3000, 'localhost', ()=>{
    console.log("Server is listening to port 3001");
});
app.use((req, res)=>{
    res.status(400).send("BAKA! ")
});




/*
    username : Koro-Coder
    password : KdcCp5mm0asrETxc
*/

// Mongoose 

db_link = 'mongodb+srv://Koro-Coder:KdcCp5mm0asrETxc@foofighter.1locd0w.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(db_link)
.then(function(db){
    console.log("DB Connected. ");
})
.catch(function(db){
    console.log("ERROR !!!");
});

/*(async function createOrder(){
    let newOrder = {
        "customer": "6439aa7a06da4c13fc618ee1",
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
    let data = await orders.create(newOrder);
    console.log(data);
})();
*/

/*
(async function createSeller(){
    let seller = {
        name:'Gruncle Stan',
        email:'Money@gmail.com',
        password:'$$$$$$$$',
        confirmPassword:'$$$$$$$$'
    };
    let data = await sellerModel.create(seller);
    console.log(data);
})();
*/

/*

const sellerSchema = mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true,
        unique:true
    },
    password:{
        type: String,
        required:true,
        minLength:8
    },
    confirmPassword:{
        type: String,
        required:true
    },
    
});

const sellerModel = mongoose.model('sellerModel', sellerSchema);
*/