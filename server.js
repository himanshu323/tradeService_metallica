let config=require("./config/config")
const express = require("express");
const bodyParser = require("body-parser")
const tradeRoutes = require("./routes/trades")

const mongoose = require("mongoose");


const path = require("path");



const app = express();

const port=process.env.PORT || "3002";

mongoose.connect(process.env.MONGODB_URI);




app.use(bodyParser.json())

app.use("/", express.static(path.join(__dirname, "angular")))

app.use((req, resp, next) => {

    resp.setHeader("Access-Control-Allow-Origin", "*");


    resp.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization");

    resp.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE,OPTIONS,PUT")
    next();
})

app.use("/api/trades", tradeRoutes)


app.listen(port,()=>{
    console.log(`Server is started on port ${port}`);
})

