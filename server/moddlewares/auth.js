const User = require("../models/user");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.userAuthMiddleware = async (req, res, next) => {
  try {
    console.log("Auth Attempt!");
    const token = req.cookies.token;
    if (!token) {
      throw new Error("Token not provided");
    }
    const data = await jwt.verify(token, process.env.TOKEN_KEY);
    const user = await User.findById(data.id);
    if (user) {
      req.user = user;
      next();
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    console.error(error.message);
    res.json({
      success: false,
      message: "Authentication failed",
      error: error.message,
    });
  }
};

// owner middleware
module.exports.ownerAuthMiddleware = async (req, res, next) => {
  try {
    console.log("Owner Auth Attempt!");
    const token = req.cookies.token;
    if (!token) {
      throw new Error("Token not provided");
    }
    const data = await jwt.verify(token, process.env.TOKEN_KEY);
    const user = await User.find({ _id: data.id, role: "owner" });
    if (user) {
      req.user = user;
      next();
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    console.error(error.message);
    res.json({
      success: false,
      message: "Authentication failed",
      error: error.message,
    });
  }
};
