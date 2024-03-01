const mongoose = require("mongoose");
const User = require("../models/user");
const { createSecretToken } = require("../utils/generateSecretToken");
const bcrypt = require("bcryptjs");

module.exports.Signup = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email }).session(session);

    if (existingUser) {
      await session.abortTransaction();
      return res.status(400).json({ error: "User already exists" });
    }

    const user = await User.create([{ email, password }], { session });
    const token = createSecretToken(user[0]._id);

    await session.commitTransaction();
    session.endSession();

    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    user[0].password = ""
    res.status(201).json({ message: "User signed up successfully",  user:user[0] });
    next();
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error"});
  }
};

module.exports.Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Incorrect password or email' });
    }

    const auth = await bcrypt.compare(password, user.password);

    if (!auth) {
      return res.status(401).json({ error: 'Incorrect password or email' });
    }

    const token = createSecretToken(user._id);

    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    user.password = ""
    res.status(200).json({ message: "User logged in successfully", user});
    next();
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error"});
  }
};

module.exports.pingUser = async (req, res, next) => {
  try {
    const user = req.user;
    // generate new cookie
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });

    res.status(200).json({ message: "User Found!", user});
    next();
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error"});
  }
};

module.exports.getUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    // generate new cookie
    const user = await User.findById(id);
    res.status(200).json({ message: "User Found!", user});
    next();
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error"});
  }
};