let express = require("express");
let { validateToToken } = require("../model/authModel");

let getAccountDetails = async (req, res) => {
  try {
    if(req.user){
      res.status(200).send({sucess: true, user: req.user, message: "sucessfull" });
    } else{
      res.status(200).send({sucess: false, message: "invalid token" });
    }
   
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  getAccountDetails,
};
