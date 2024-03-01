const express = require("express");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
var cors = require("cors");
const bodyParser = require("body-parser");
const userRoute = require("./routes/userRoutes")
const productRoute = require("./routes/productRoutes")
const orderRoute = require("./routes/orderRoutes")
// creating app object from express
const app = express();

// defined the port in environment
const PORT = process.env.PORT || 8082;

//body-parse
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// cors
const corsOptions = {
  origin: true,
  credentials: true,
};
app.use(cors(corsOptions));

// cookie parser
app.use(cookieParser());

// connect to mongoDB
connectDB();

// root url route
app.get("/", (req, res) => {
  res.send("Hello Flic!");
});

// routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/order", orderRoute);

// running server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

// exporting app as module
module.exports = app;