const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

const adminModel = require("./models/admin");
const userModel = require("./models/user");
const productModel = require("./models/product");
const inquiryModel = require("./models/inquiry");
const signup = async (req, res) => {
  // Fetchng Data from request
  const { username, display_name, password } = req.body;

  try {
    // Existing User Check
    console.log("--");
    console.log(adminModel.collection.collectionName);
    console.log(adminModel);
    console.log("--");
    const existingUser = await adminModel.findOne({ username: username });
    if (existingUser) {
      console.log(existingUser);
      return res.json({
        message: "User already Exists",
        user: existingUser,
        model: adminModel,
      });
    }

    // Hashed Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // User Creation
    const result = await adminModel.create({
      username: username,
      display_name: display_name,
      password: hashedPassword,
    });

    // Token Generation
    const token = jwt.sign(
      { username: result.username, id: result._id },
      SECRET_KEY
    );
    //res.json({ user: result, token: token });
    return res.redirect("/");
  } catch (error) {
    console.log(error);
    res.json({ message: "Something went Wrong" });
  }
};

const signIn = async (req, res) => {
  const { username, password } = req.body;
  try {
    // Existing User Check
    const existingUser = await adminModel.findOne({ username: username });

    if (!existingUser) {
      return res.json({ message: "User not found" });
    }

    //Compare password
    const matchPassword = await bcrypt.compare(password, existingUser.password);
    if (!matchPassword) {
      return res.json({ message: "Invalid Crecentials" });
    }

    // Token Generation
    const token = jwt.sign(
      {
        username: existingUser.username,
        display_name: existingUser.display_name,
        id: existingUser._id,
      },
      SECRET_KEY
    );
    //res.json({ user: existingUser, token: token });
    res.setHeader("Authorization", "Bearer " + token);
    res.header("Authorization", "Bearer " + token);
    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 1000 * 60 * 60),
      httpOnly: true,
    });
    return res.redirect("/category");
  } catch (error) {
    console.log(error);
    //res.json({ message: "Something went Wrong" });
    return res.redirect("/login");
  }
};

const apiSignUp = async (req, res) => {
  // Fetchng Data from request
  const { first_name, last_name, email, password, phone_number, dob } =
    req.body;
  try {
    // console.log(req.body);
    // res.json({ message: req.body });

    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      console.log(existingUser);
      return res.json({
        message: "User already Exists",
        // user: existingUser,
        // model: adminModel,
      });
    }

    // Hashed Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // User Creation
    const result = await userModel.create({
      first_name: first_name,
      last_name: last_name,
      email: email,
      passwordHash: hashedPassword,
      phone_number: phone_number,
      dob: dob,
    });

    // Token Generation
    const token = jwt.sign(
      {
        first_name: result.first_name,
        last_name: result.last_name,
        email: result.email,
        phone_number: result.phone_number,
        dob: result.dob,
        id: result._id,
      },
      SECRET_KEY
    );

    return res.json({ user: result, token: token });
  } catch (error) {
    console.log(error);
  }
};

const apiSignIn = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    // Existing User Check
    const existingUser = await userModel.findOne({ email: email });

    if (!existingUser) {
      return res.json({ message: "User not found" });
    }
    //Compare password
    const matchPassword = await bcrypt.compare(
      password,
      existingUser.passwordHash
    );
    if (!matchPassword) {
      return res.json({ message: "Invalid Crecentials" });
    }

    // Token Generation
    const token = jwt.sign(
      {
        first_name: existingUser.first_name,
        last_name: existingUser.last_name,
        email: existingUser.email,
        phone_number: existingUser.phone_number,
        id: existingUser._id,
      },
      SECRET_KEY
    );
    return res.json({ user: existingUser, token: token });
    //res.setHeader("Authorization", "Bearer " + token);
    //res.header("Authorization", "Bearer " + token);
    // res.cookie("jwt", token, {
    //   expires: new Date(Date.now() + 1000 * 60 * 60),
    //   httpOnly: true,
    // });
    //return res.redirect("/");
  } catch (error) {
    console.log(error);
    res.json({ message: "Something went Wrong2" });
    //return res.redirect("/login");
  }
};

const apiChangePass = async (req, res) => {
  const { userId, password } = req.body;
  console.log(req.body);
  try {
    // Existing User Check
    const existingUser = await userModel.find({ _id: userId });
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await userModel.findOneAndUpdate(
      { _id: existingUser[0]._id },
      {
        passwordHash: hashedPassword,
      }
    );
    return res.json({ message: "password updated" });
  } catch (error) {
    console.log(error);
    res.json({ message: "Something went Wrong2" });
    //return res.redirect("/login");
  }
};

const apiSendInquiry = async (req, res) => {
  const { userId, product_id, message } = req.body;
  console.log(req.body);
  try {
    // Existing User Check
    const user = await userModel.find({ _id: userId });
    const product = await productModel.find({ _id: product_id });

    const currentDt = new Date();
    const currentDate = `${currentDt.getFullYear()}-${currentDt.getMonth()}-${currentDt.getDate()}`;
    const currentTime = `${currentDt.getHours()}:${currentDt.getMinutes()}:${currentDt.getSeconds()}`;
    const result = await inquiryModel.create({
      user_id: new mongoose.Types.ObjectId(user[0]._id),
      product_id: new mongoose.Types.ObjectId(product[0]._id),
      inquiry_message: message,
      received_date: currentDate,
      received_time: currentTime,
    });
    console.log(result);

    return res.json({ message: "Inquiry Sent" });
  } catch (error) {
    console.log(error);
    res.json({ message: "Something went Wrong" });
    //return res.redirect("/login");
  }
};

const apiInquiryRecords = async (req, res) => {
  const { userId } = req.body;
  console.log(req.body);
  try {
    // Existing User Check
    const user = await userModel.find({ _id: userId });
    const fetch_inquiry = await inquiryModel.aggregate([
      {
        $match: {
          user_id: user[0]._id,
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "product_id",
          foreignField: "_id",
          as: "product_details",
        },
      },
    ]);
    console.log(fetch_inquiry);

    return res.json({ fetch_inquiries: fetch_inquiry });
  } catch (error) {
    console.log(error);
    res.json({ message: "Something went Wrong" });
    //return res.redirect("/login");
  }
};

module.exports = {
  signIn,
  apiSignUp,
  apiSignIn,
  apiChangePass,
  apiSendInquiry,
  apiInquiryRecords,
};
