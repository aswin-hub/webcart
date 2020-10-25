const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
require('dotenv').config();
const bodyParser = require("body-parser");
const cors = require('cors');

const authRoutes = require("./routes/auth")

const mongoose = require("mongoose");

//yXqyrDQQTDxgXfKm
//mongodb+srv://Aswin:yXqyrDQQTDxgXfKm@cluster0.nmitb.mongodb.net/webCart?retryWrites=true&w=majority


//Port
const port = process.env.PORT || 7000;

//DB Connections
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser :  true,
    useCreateIndex : true,
    useUnifiedTopology : true
}).then(()=>{
    console.log("MONGODB Connected")
}).catch(()=>{
    console.log("OOPS DATABASE not Connnected")
})

//middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//Routes
app.use("/api", authRoutes)


app.get('/',(req, res)=> {
    return res.send ("hello there");
})



//Starting a server
app.listen(port, ()=>{
    console.log("server is hitting up....");
})