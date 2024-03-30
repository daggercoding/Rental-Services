const express =require("express")
const bodyParser = require("body-parser");
const env = require("dotenv")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const endpoint=require("./Controller/Endpoint")


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


app.listen(8000,()=>{
    console.log("Server is Up Baby..:)")
})