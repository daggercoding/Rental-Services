const express =require("express")
const bodyParser = require("body-parser");
const env = require("dotenv")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const endpoint=require("./Controller/Endpoint")
const {userDetail,userItem,CartItem} = require("./Model/Db");
const mongoose = require("mongoose")




const app = express()
app.use(cors())
env.config()
app.use(cookieParser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))

////=================================>>>> Creating Routes to Handle Form Data
app.get("/",endpoint.sayHello)

app.post("/login",endpoint.login)

app.post("/signup",endpoint.signUp)

app.post("/addItem",endpoint.addItem)

app.post("/updateProduct",endpoint.updateProduct);

app.post("/addToCart",endpoint.addToCart)


app.get("/getItemById/:id",async(req,res)=>{
try{const data = await userItem.findById(req.params.id)
res.status(200).send(data)}catch(err){
 res.send(err)
}
})


////=================================>>>>creating route to send data to the user

app.get("/getitems",endpoint.getitems)
////=================================>>>>creating route to Save Filter Data by the USer

app.post("/cartItem",endpoint.cartItem );


app.post("/singleUser",async(req,res)=>{
  try{
    const data = await userDetail.findById(req.body.id).populate("cart")
    console.log(data)
    if(data){
     res.status(200).send({data})
    }else{
      res.status(404).send("No User Found For The Provided Id")
    } 
  }catch(err){
    res.send(err)
  }
})
  
  // Route to retrieve all cart items
app.get("/cartItems",endpoint.cartItems );

////=================================>>>>creating route to Delete Filter Data by the USer
app.delete("/deleteCart",endpoint.deleteCart)


app.listen(8000,()=>{
    console.log("Server is Up Baby..:)")
})