var jwt = require("jsonwebtoken");

let { findUserByEmail } = require("../model/accountModel");

const dotenv = require("dotenv");
dotenv.config();

const privateKey = process.env.JWT_SECRET;

let createToken = (email) => {
  try {
    
    const token = jwt.sign({ email: email }, privateKey);
    if (token) {
      return token;
    } else {
      throw new Error("token is not created")
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

let decodeToken = async (req, res, next) => {
  try {
    const decoded = decode(req.headers.token);
   // const decode = jwt.verify(req.headers.token, privateKey);
    //console.log(decode);

    let user = await findUserByEmail(decoded.email);

    if (user) {
      req.user = user;
      
    }
    next();
  } catch (error) {
    next(new Error(error));
  }

  //   const decode = jwt.verify(req.headers.token, privateKey);
  //   return decode.email === req.body.email ? next() : res.status(400);
}

let decode = async(token) => {
  try {
    const decode = await jwt.verify(token, privateKey, {complete: true});
    return decode;
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
}

let forgetPasswordToken = async(email) => {
  try {
    const passwordToken = jwt.sign(
      { email: email}, 
      privateKey, 
      {expiresIn: "10h" });
      //expiresIn: "20d" // it will be expired after 20 days
      //expiresIn: 120 // it will be expired after 120ms
      //expiresIn: "120s" // it will be expired after 120s;
      return(passwordToken);
    
  } catch (error) {
    throw new Error("Token is not valid for forgetPassword process")
  }

};



module.exports = { 
  createToken, 
  decodeToken,
  forgetPasswordToken, 
  decode,
  };
