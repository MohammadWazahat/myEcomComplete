const express = require("express");
const { connectMongoDb } = require("./Connection/connection");
const Razorpay = require("razorpay");

//Routes import
const routes = require("./Routers/user");
const routesTwo = require("./Routers/adminUserRoutes");
const routesThree = require("./Routers/userEcomRoute");
const authRoutes = require("./Routers/auth");
const paymentRoute = require("./Routers/paymentRoutes.js");

//Middleware import
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");

//dotEnv imports
require("dotenv").config();

const app = express();

//Variable
const port = 3015;

//Connection
connectMongoDb("mongodb://127.0.0.1:27017/myEcom");

//Middleware
app.use(cors());
// Middleware for Ejs
app.set("view engine", "ejs");
app.set("views", path.resolve("./Views"));

//Middleware for rendering form data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//Auth Routes Middleware
app.use(authRoutes);

//Middleware to render all the routes
app.use(routes);
app.use(routesTwo);
app.use(routesThree);

//Payment routes
app.use("/api", paymentRoute);

app.get("/api/getkey", (req, res) =>
  res.status(200).json({ key: process.env.RAZORPAY_API_KEY })
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
