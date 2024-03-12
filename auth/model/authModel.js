const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: "Email address is required",
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  password: {
    type: String,
    required: true,
  },
  forgetPassword: {
    type: String,
    default: null,
  },
  newPassword: {
    type: String,
    default: null,
  }
});

userSchema.pre("save", function (next) {
  if (this.firstName) {
    this.firstName =
      this.firstName.slice(0, 1).toUpperCase() + this.firstName.slice(1);
  }

  if (this.lastName) {
    this.lastName =
      this.lastName.slice(0, 1).toUpperCase() + this.lastName.slice(1);
  }

  next();
});

const UserModel = mongoose.model("user", userSchema);

//Create

const createToDatabse = async (dataToSave) => {
  console.log("dataToSave", dataToSave);
  try {
    const data = new UserModel(dataToSave);
    const savedData = await data.save();
    return savedData.toJSON();
  } catch (error) {
    throw new Error(error);
  }
};

//Read

const readToDatabase = async (dataToRead) => {
  console.log("dataToRead", dataToRead);
  try {
    let response = await UserModel.findOne(dataToRead);

    return response;
  } catch (error) {
    throw new Error(error);
  }
};
//update database

const updateToDatabase = async (email, dataToUpdate ) => {
  try {
    let updated = UserModel.findOneAndUpdate(
      { email: email },
      { $set: dataToUpdate }
    );
    return updated;
    // let userMail= await UserModel.findOne({email: email});
    // if(userMail){
    //   return userMail;
    // }else{
    //   throw new Error("userMail not found")
    // }
    // const updateData = new userModel.userMail.update(dataToUpdate);
    // const upUdateToData = await updateData.save();
    // return updateData.toJSON();
  } catch (error) {
    throw new Error(error);
  }
};


//reset password
const findAndUpdateUser = async(query,dataToupdate) =>{
  try {
    let updateDb = await UserModel.findOneAndUpdate(
      query,
       { $set: dataToupdate}
      // {new: true}
    );
    return updateDb
  } catch (error) {
    throw new Error(error)
  }
}

//validate the tokenId
const validateToToken = async (tokenValidation) => {
  // console.log("token ==", validateToToken.tokenValidation)
  try {
    let email = await UserModel.findOne();
  } catch (error) {
    throw new Error("something wrong");
  }
};

module.exports = {
  UserModel,
  createToDatabse,
  readToDatabase,
  updateToDatabase,
  validateToToken,
  findAndUpdateUser,
  
};
