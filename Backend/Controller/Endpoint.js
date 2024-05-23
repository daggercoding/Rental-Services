const {userDetail,userItem} = require("../Model/Db")

const jwt = require("jsonwebtoken")
const env = require("dotenv")
env.config()

module.exports.login = async (req, res) => {
  try {
      const validUser = await userDetail.find({ name: req.body.name, password: req.body.password });
      console.log(validUser);
      if (validUser.length <= 0) {
          res.status(401).send("Invalid credentials");
          return;
      }else{
          const token = jwt.sign({ _id: validUser[0]._id }, process.env.SECRET, {
          expiresIn: process.env.EXPIRE
      });
        res.cookie("token",token,{ httpOnly: true})
        res.status(200).json([{ id: validUser[0]._id }]); 
      return;
      }
      
  } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
  }
};


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
    res.status(200).json({
        data
    })
}

module.exports.updateProduct =async(req, res) => {
  try {
    const updatedUser = await userItem.findByIdAndUpdate(req.body.id,req.body,{ new: true });
    res.status(200).send(updatedUser)
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}

module.exports.addToCart = async (req, res) => {
  try {
    const userId = req.body.userId;
    const productId = req.body.productId;

    // Find the user by ID
    const user = await userDetail.findById(userId);

    // Check if the product already exists in the cart
    const productInCart = user.cart.findIndex(item => item.id+"" == productId);
    
    if (productInCart<0) {
      // Add the product to the cart
      user.cart.push({ id: productId, Qnt: 1 });
    }
    // Save the updated user document
    const updatedUser = await user.save();

    if (updatedUser) {
      res.status(200).json(updatedUser.cart.length);
    } else {
      res.status(500).send("Cannot add to cart");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports.deleteCart= async (req, res) => {
  try{
  const userId = req.body.userId;
  const productId = req.body.productId;
  const user = await userDetail.findById(userId)
  const data = user.cart.filter(item=>item.id+"" !==productId);
  await userDetail.findByIdAndUpdate(userId,{$set:{cart:data}})
  res.status(200).send(data)
  }catch (error) {
        console.error("Error deleting item from cart:", error);
        res.status(500).json({ error: "Internal server error" });
    }

  // try {
  //     const userId = req.body.userId;
  //     const productId = req.body.productId;
  //     let updated=await userDetail.findByIdAndUpdate(userId, { $pull: { cart: productId}},{new:true}).populate("cart");
  //     console.log(updated)
  //     res.status(200).send(updated.cart);
  // } catch (error) {
  //     console.error("Error deleting item from cart:", error);
  //     res.status(500).json({ error: "Internal server error" });
  // }
};

module.exports.updateCartQuantity = async(req, res) =>{
  const userId = req.body.id;
  const productId = req.body.prodId;
  const qnt  = req.body.qnt;
  console.log(productId)
  let user = await userDetail.findById(userId)
  console.log(user.cart[0].id+"")

  const updatedUser = await userDetail.findByIdAndUpdate(
    userId,
    { $set: { "cart.$[item].Qnt": qnt } },
    {
       new: true,
       arrayFilters: [{ "item.id": productId }] // This filters to find the array element with the specified productId
    }
  );

  res.status(200).json({status:"success",data:[updatedUser]})


//   const updatedUser = await userDetail.findByIdAndUpdate(
//     userId,
//     { $set: { cart: {id:productId, Qnt:qnt} } },
//     {
//        new: true,
     
//      }
// );

//   console.log(updatedUser)
//   res.status(200).json({status:"sucess"})
}

// const updatedUser = await userDetail.findByIdAndUpdate(
//   userId,
//   { $set: { "cart.$[elem].Qnt": qnt } },
//   { 
//     new: true, // Return the modified document
//     arrayFilters: [{ "elem.id": productId }] // Filter to find the array element with the specified productId
//   }
// );

module.exports.singleUser=async(req,res)=>{
  try{
    const data = await userDetail.findById(req.body.id).populate("cart.id")
    console.log(data)
    if(data){
     res.status(200).send({data})
    }else{
      res.status(404).send("No User Found For The Provided Id")
    } 
  }catch(err){
    res.send(err)
  }
}

module.exports.getItemById=async(req,res)=>{
  try{const data = await userItem.findById(req.params.id)
  res.status(200).send(data)}catch(err){
   res.send(err)
  }
  }

module.exports.order = async(req, res)=>{
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
}

module.exports.validatePayment=(req,res)=>{
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
 
}

module.exports.emptyCart = async (req, res) =>{
  const id = req.body.ids;
 let deltedData = await userDetail.findOneAndUpdate({_id:id}, { $unset:{"cart":1}},{new:false} );
 console.log(deltedData)
  res.status(200).json({status:"success", data:deltedData});
}