const {userDetail,userItem,CartItem} = require("../Model/Db")
const jwt = require("jsonwebtoken")
const env = require("dotenv")
env.config()


module.exports.sayHello=(req,res)=>{
    res.send("hello ji")
}

module.exports.login= async (req,res)=>{
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
 }

 module.exports.signUp=async(req,res)=>{
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
}

 module.exports.addItem=async(req,res)=>{
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
}

 module.exports.getitems=async(req,res)=>{
    const data = await userItem.find()
    const data2= await CartItem.find()
    res.status(200).json({
        data:data,
        length:data2.length
    })
}

 module.exports.cartItem=async (req, res) => {
    try {
      let filterUser = new CartItem(req.body);
      let allData = await CartItem.findById(req.body._id);
      let data= await CartItem.find()
      if (allData === null) {
        await filterUser.save();
        res.status(200).json({ status:"Success",length:data.length});
      }else{
        res.status(400).json(
        {status:"Item Already Exist",length:data.length})
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  }
  

 module.exports.cartItems=async (req, res) => {
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
  }

  module.exports.deleteCart=async(req,res)=>{
    const deletedItem=await CartItem.findByIdAndDelete(req.body.id)
    res.status(200).send({
        data:deletedItem
    })
}