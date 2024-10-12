const express = require("express");
const bodyParser = require("body-parser")
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const db = require("./config/database");
dotenv.config();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.get("/",(req,res)=>{
    res.send("api working")
})



app.listen(process.env.PORT, ()=>{
    console.log(`listening on ${process.env.PORT}`)
})