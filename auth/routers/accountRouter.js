let express = require("express");
let accountRouter = express.Router();
let { getAccountDetails } = require("../controllers/accountController");
let { decodeToken } = require("../jwtAuthentication/jwtauth");

accountRouter.get("/all", decodeToken, getAccountDetails);

module.exports = {
  accountRouter,
};
