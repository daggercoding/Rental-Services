const mongoose =require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/RentalData")
.then(()=>console.log("Connected To Database"))

const userData = new mongoose.Schema({
    name:String,
    email:String,
    password:String
})
const UserItem = new mongoose.Schema({
    product:String,
    link:String,
    description:String,
    charges:Number,
    duration:Number,
    quantity:Number
})

const cartItem = new mongoose.Schema({
    _id:String,
    product:String,
    link:String,
    description:String,
    charges:Number,
    duration:Number,
    quantity:Number
})


let userItem = mongoose.model("items",UserItem)
let userDetail = mongoose.model("users",userData)
let CartItem = mongoose.model("cartItems",cartItem)

module.exports={
    userDetail,
    userItem,
    CartItem                                                                                                                                                                                                                                                                                                                                                                                                        
}