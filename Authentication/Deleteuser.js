const User = require("../Database/Userdatabase");

let successmessage = {
  success: true,
  message: "",
};

// function to Delete the user account from site...
const deleteuser = async (req, res) => {
  const payload = req.user;
  await User.deleteOne({ email: payload.email });
  successmessage.message = "Account Deleted Successfully";
  return res.status(200).json(successmessage);
};

module.exports = deleteuser;
