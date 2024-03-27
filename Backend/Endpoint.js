module.exports.sayHello=(req,res)=>{
    res.send("hello ji")
}

module.exports.sayHello= async (req,res)=>{
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