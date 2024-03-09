let successmessage = {
  success: true,
  message: "",
};

// fucntion to logout the user from the site...
const signout = (req, res) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
  }
  successmessage.message = "User Logged Out";
  return res.status(200).json(successmessage);
};

module.exports = signout;
