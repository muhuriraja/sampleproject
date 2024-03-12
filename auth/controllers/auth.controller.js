let express = require("express");
let {
  createToDatabse,
  readToDatabase,
  updateToDatabase,
  findAndUpdateUser,
} = require("../model/authModel");
let { findUserByEmail } = require("../model/accountModel");
let { createForgetPasswordEmail } = require("../../EJS/template");

const { sendMail } = require("../services/sendMail");

const bcrypt = require("bcrypt");
const {
  createToken,
  forgetPasswordToken,
  decode,
} = require("../jwtAuthentication/jwtauth");
const saltRounds = 10;

//var jwt = require('jsonwebtoken');
let signup = async (req, res) => {
  try {
    console.log("ami body bolchi", req.body);
    let password = req.body.password;

    // encrypted password
    let hash = await bcrypt.hash(password, saltRounds);
    // Store hash in your password DB.
    console.log("encrypted password == ", hash);

    req.body.password = hash;

    const saveData = await createToDatabse(req.body);
    console.log("save data", saveData);
    delete saveData.password;
    res
      .status(200)
      .send({ message: "data is saved", success: true, user: saveData });

    //var token = jwt.signup({userId: saveData.id})
    // decripted password
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

let signin = async (req, res) => {
  try {
    let password = req.body.password;
    // let hash= await bcrypt.hash(password, saltRounds) ;

    const readData = await readToDatabase({ email: req.body.email });
    console.log("hello", readData._id);
    const isValidPassword = await bcrypt.compare(password, readData.password);
    if (isValidPassword) {
      res.status(200).send({
        message: "log in sucessful",
        userId: readData._id,
        success: true,
        userToken: createToken(req.body.email), //show data to postman
      });
    } else {
      res.status(200).send({ success: false, message: "password mismatch" });
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

let forgetPassword = async (req, res) => {
  try {
    console.log("here");
    const findEmail = await findUserByEmail(req.body.email);
    // const findMail = await updateToDatabase({email: req.body.email})

    if (findEmail) {
      const token = await forgetPasswordToken(findEmail.email);
      console.log("forgetpassword", forgetPassword);

      const forgetPasswordUpdate = await updateToDatabase(req.body.email, {
        forgetPassword: token,
      });
      const mailBody = createForgetPasswordEmail(token);
      const mail = await sendMail(req.body.email, mailBody);

      console.log("mail = ", mail);
      if (mail) {
        res
          .status(200)
          .send({ success: true, message: "password reset sucessful" });
      } else {
        res
          .status(200)
          .send({ success: false, message: "mail is not send properly" });
      }

      //res.status(200).send("mail valid")
    } else {
      res.status(200).send({ success: false, message: "user not found" });
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

let resetPassword = async (req, res) => {
  try {
    console.log("reset password process start");
    const token = req.params.token;
    console.log("token == ", token);

    const dToken = await decode(token);
    console.log("decoded token", dToken.payload.email);

    let encryptedPassword = await bcrypt.hash(req.body.newPassword, saltRounds);

    const setPassword = await findAndUpdateUser(
      { email: dToken.payload.email, forgetPassword: token },
      { password: encryptedPassword }
    );

    if (!setPassword)
      res.status(200).send({ success: false, message: "user not find" });
    else res.status(200).send({ success: true, message: "sucessfull" });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

// let tokenvalidation = async (req, res) => {
//   try {

//   } catch (error) {

//     res.status(401).send({message:error.message})

//   }
// }

module.exports = {
  signup,
  signin,
  forgetPassword,
  resetPassword,
};
