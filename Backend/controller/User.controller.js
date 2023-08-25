const express = require("express");
const { UserModel } = require("../model/User.model");
const jwt = require("jsonwebtoken");
const UserController = express.Router();
require("dotenv").config();

UserController.post("/signup", async (req, res) => {
  try {
    const { email, name } = req.body;
    const isUserExist = await UserModel.findOne({ email, name });
    if (isUserExist) {
      return res
        .status(200)
        .json({ message: "User Already Exist. Please Login" });
    }
    const user = new UserModel({
      email,
      name,
    });
    await user.save();
    const token = jwt.sign({ user }, process.env.JWT_SECRET);
    res.status(200).json({ message: "Account created", token, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
});

UserController.post("/login", async (req, res) => {
  try {
    const { email, name } = req.body;
    const user = await UserModel.findOne({ email, name });
    if (user) {
      const token = jwt.sign({ user }, process.env.JWT_SECRET);
      res.json({ message: "Login Successful", token, user });
    } else {
      res.status(401).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
});

module.exports = { UserController };
