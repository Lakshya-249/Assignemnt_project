const User = require("../Database/Userdatabase");
const rateLimit = require("express-rate-limit");
const { comparePasswords } = require("../PasswordEncryptor/encrypt");
const { generateToken } = require("../Authfilter/JwtToken");

let errormessage = {
  success: false,
  message: "",
};

let successmessage = {
  success: true,
  message: "",
};

// Apply rate limiting middleware
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute window
  max: 5, // limit each IP to 5 requests per windowMs
  message: "Too many requests from this IP, please try again later",
});

//Signin function for user to login..
const signin = async (req, res) => {
  const body = req.body;
  if (!body || !body.email || !body.password) {
    errormessage.message = "Login Failed!! Both the Fields Required.";
    return res.status(400).json(errormessage);
  }
  authenticate(body.email, body.password, res);
};

const authenticate = async (u_email, u_password, res) => {
  const user = await User.findOne({ email: u_email });
  if (user == null) {
    errormessage.message =
      "Invalid Email!! No user found with following Email.";
    return res.status(404).json(errormessage);
  }
  const checkpass = await comparePasswords(u_password, user.password);
  if (!checkpass) {
    errormessage.message = "Invalid Password!!";
    return res.status(400).json(errormessage);
  }
  // Creating a payload and generating a token using it...
  const payload = {
    email: u_email,
    password: user.password,
  };
  const token = generateToken(payload);
  successmessage.message = `User Logged in Successfully with token ${token}`;
  return res.status(200).json(successmessage);
};

module.exports = { limiter, signin };
