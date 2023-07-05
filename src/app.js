const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("express").Router();
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const {register,logIn} = require('../src/controller/authController')
const {getPreferences,updatePreferences} = require('../src/controller/preferenceController')
const { authenticateToken } = require("../src/helper/middleware");
app.use(cors());
app.use(routes);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
routes.use(bodyParser.urlencoded({ extended: false }));
routes.use(bodyParser.json());
const PORT = 3000;
try {
   mongoose.connect("mongodb://localhost:27017/userdb",{
    useUnifiedTopology : true,
    useNewUrlParser: true
   })
   console.log("connected to db")
}catch(err){
   console.log("error while connecting to the db")
}
routes.get("/", (req, res) => {
  res.status(200).send("Welcome to news-feed-airtribe");
});

routes.post("/register",register);
routes.post("/login",logIn);
routes.get("/preferences/:userId", authenticateToken,getPreferences);
routes.put("/preferences/:userId", authenticateToken,updatePreferences);
app.listen(PORT, (err) => {
  if (!err) {
    console.log("Server started");
  } else {
    console.log("Some error has occured");
  }
});
