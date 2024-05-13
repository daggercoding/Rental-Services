const express =require("express")
const bodyParser = require("body-parser");
const env = require("dotenv")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const endpoint=require("./Controller/Endpoint")
const Razorpay = require("razorpay")
const crypto = require("crypto");
const { userDetail } = require("./Model/Db");


const app = express()
app.use(cors())
env.config()
app.use(cookieParser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))

////=================================>>>> Creating Routes to Handle Form Data
app.post("/login",endpoint.login)

app.post("/signup",endpoint.signUp)

app.post("/addItem",endpoint.addItem)

app.post("/updateProduct",endpoint.updateProduct);

app.post("/addToCart",endpoint.addToCart)

app.get("/getItemById/:id",endpoint.getItemById)

app.get("/getitems",endpoint.getitems)

app.post("/singleUser",endpoint.singleUser)

app.delete("/deleteCart",endpoint.deleteCart)

app.post("/updateCartQuantity",endpoint.updateCartQuantity)

app.post("/order", async(req, res)=>{
    try{
        const razorpay = new Razorpay({
            key_id:process.env.RAZORPAYID,
            key_secret:process.env.RAZORPAYKEY
        })
    
        const option = req.body
        const order = await razorpay.orders.create(option)
        if(!order){
            res.status(500).send("some error occured")
        }
        res.status(200).json(order)
    }catch(err){
        console.log(err)
    }
})

app.post("/validatePayment",(req,res)=>{
    try{
        
        const {razorpay_order_id,razorpay_payment_id,razorpay_signature}=req.body
        const sha  = crypto.createHmac("sha256",process.env.RAZORPAYKEY)
        sha.update(`${razorpay_order_id}|${razorpay_payment_id}`)
        const digest = sha.digest("hex")
        if(digest!==razorpay_signature){
            return res.status(400).json({msg:"Transaction is not Legit"})
        }
        res.json({
            status:"Sucess",
            orderId:razorpay_order_id,
            paymentId:razorpay_payment_id
        })
    }catch(err){
        console.log(err)
    }
   
})

app.delete("/emptyCart", async (req, res) =>{
    const id = req.body.ids;

   let deltedData = await userDetail.findOneAndUpdate({_id:id}, { $unset:{"cart":1}},{new:false} );
   console.log(deltedData)
    res.status(200).json({status:"success", data:deltedData});

})
app.listen(8000,()=>{
    console.log("Server is Up Baby..:)")
})