let express = require("express");
const indexRouter = express.Router();
const authController = require("../controllers/auth.controller");
let {
  createToken,
  forgetPasswordToken,
} = require("../jwtAuthentication/jwtauth");

// indexRouter.get('/signup',function(req,res){
//         res.status(200).send("hello I'm in controller")
//     })

indexRouter.post("/signup", authController.signup);
indexRouter.post("/signin", authController.signin);
indexRouter.post("/forgetPassword", authController.forgetPassword);
indexRouter.post("/resetPassword/:token",authController.resetPassword );

module.exports = indexRouter;
