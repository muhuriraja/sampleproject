const { UserModel } = require("./authModel");

let findUserByEmail = async (email) => {
  try {
    let user = await UserModel.findOne({ email: email }, { password: 0 });
    if (user) {
      return user;
    } else {
      return;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  findUserByEmail,
};
