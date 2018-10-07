const express = require("express");
const bodyParser = require("body-parser")
const tradeRoutes = require("./routes/trades")

const mongoose = require("mongoose");


const path = require("path");

const app = express();
//mongodb://<dbuser>:<dbpassword>@ds261332.mlab.com:61332/meandb323
mongoose.connect(process.env.MONGODB_URI);

//mongodb://him323:lpqaqa12@ds261332.mlab.com:61332/meandb323
//mongoose.connect("mongodb://him323:" + process.env.MONGODB_PASSWORD + "@ds261332.mlab.com:61332/meandb323");


app.use(bodyParser.json())

app.use("/", express.static(path.join(__dirname, "angular")))

app.use((req, resp, next) => {

    resp.setHeader("Access-Control-Allow-Origin", "*");


    resp.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization");

    resp.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE,OPTIONS,PUT")
    next();
})

app.use("/api/trades", tradeRoutes)





// app.use((req, resp, next) => {

//     resp.sendFile(path.join(__dirname, "angular", "index.html"));
// })








module.exports = app;