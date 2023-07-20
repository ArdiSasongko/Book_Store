const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const PORT = process.env.PORT || 5050
const app = express()
const dotenv = require("dotenv")

dotenv.config()
require("./Module/Database/connect")

const Book = require("./Module/Route/bookroutes")
const User = require("./Module/Route/userroutes")

app.use(cors())

app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())

app.get("/", (req,res)=>{
    console.log("Response Success");
    res.status(200).json("Response Success")
})

app.use("/Book", Book)
app.use("/User", User)

app.listen(PORT, ()=>{
    console.log(`Server Running in http://localhost:${PORT}`);
})
