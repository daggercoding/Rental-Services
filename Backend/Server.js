const express =require("express")
const {userDetail,userItem} = require("./Model/Db")
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken")
const env = require("dotenv")
const Cookie = require("cookie-parser")

const app = express()
env.config()
app.use(Cookie())
app.use(bodyParser.urlencoded({extended:false}))

////=================================>>>> Creating Routes to Handle Form Data
app.get("/",(req,res)=>{
    res.send("hello ji")
    res.redirect()
})

app.post("/login",async(req,res)=>{
   const validUser=await userDetail.find({name:req.body.name,password:req.body.password})
   if(validUser.length<0)
   {
    res.redirect("http://localhost:3000/#")
   }
   res.redirect("http://localhost:3000/#")
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
    res.cookie("Token",token,{ httpOnly: true})
    res.redirect("http://localhost:3000/")
})

app.post("/addItem",async(req,res)=>{
    console.log(req.body)
    const newItem = new userItem({
        product:req.body.pname,
        link:req.body.link,
        charges:req.body.price,
        duration:req.body.duration,
        quantity:req.body.quantity
    })
    await newItem.save()
    res.status(200)
    res.redirect("http://localhost:3000/")
})

app.listen(8000,()=>{
    console.log("Server is Up Baby :)")
})