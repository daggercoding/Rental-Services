const mongoose = require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/RentalData")
.then(()=>console.log("Connected To Database"))


const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    cart:[{type: mongoose.Types.ObjectId ,ref:"items"}]
})

const itemSchema = new mongoose.Schema({
    product:String,
    link:String,
    description:String,
    charges:Number,
    duration:Number,
    quantity:Number
})

let userItem = mongoose.model("items",itemSchema)
let userDetail = mongoose.model("users",userSchema)

module.exports={
    userDetail,
    userItem                                                                                                                                                                                                                                                                                                                                                                                                     
}