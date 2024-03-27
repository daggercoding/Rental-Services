const express =require("express")
const {userDetail,userItem,CartItem} = require("./Model/Db")
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken")
const env = require("dotenv")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const endpoint=require("./Endpoint")

const app = express()
app.use(cors())
env.config()
app.use(cookieParser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))

////=================================>>>> Creating Routes to Handle Form Data
app.get("/",endpoint.sayHello)

app.post("/login",async(req,res)=>{
   const validUser=await userDetail.find({name:req.body.name,password:req.body.password})
   if(validUser.length<=0)
   {
    res.redirect("http://localhost:3000/login")
   }
   else{
    const token = jwt.sign({_id:validUser[0]._id},process.env.SECRET,{
        expiresIn:process.env.EXPIRE
    }) 
    res.cookie("token",token)
    res.redirect("http://localhost:3000")
   }
})


app.post("/signup",async(req,res)=>{
    const user= new userDetail({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    })
    await user.save()
    const token=jwt.sign({_id:user._id},process.env.SECRET,{
        expiresIn:process.env.EXPIRE
    })
    res.cookie("token",token,{ httpOnly: true})
    res.redirect("http://localhost:3000/")
})

app.post("/addItem",async(req,res)=>{
    const newItem = new userItem({
        product:req.body.pname,
        link:req.body.link,
        description:req.body.description,
        charges:req.body.price,
        duration:req.body.duration,
        quantity:req.body.quantity
    })
    await newItem.save()
    res.status(200)
    res.redirect("http://localhost:3000/")
})

////=================================>>>>creating route to send data to the user

app.get("/getitems",async(req,res)=>{
    const data = await userItem.find()
    res.status(200).json({
        data
    })
})
////=================================>>>>creating route to Save Filter Data by the USer

app.post("/cartItem", async (req, res) => {
    try {
      let filterUser = new CartItem(req.body);
      let allData = await CartItem.find();
      let condition = allData.filter((item) => item._id == req.body._id);
      if (condition.length == 0) {
        await filterUser.save();
        res.status(200).json({ status:"Success"});
      }else{
        res.status(400).json({status:"Item Already Exist"})
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
  // Route to retrieve all cart items
  app.get("/cartItems", async (req, res) => {
    try {
      let data = await CartItem.find();
      res.status(200).json({
        status: "Success",
        data
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  });

////=================================>>>>creating route to Delete Filter Data by the USer
app.delete("/deleteCart",async(req,res)=>{
    const deletedItem=await CartItem.findByIdAndDelete(req.body.id)
    res.status(200).send({
        data:deletedItem
    })
})


app.listen(8000,()=>{
    console.log("Server is Up Baby..:)")
})