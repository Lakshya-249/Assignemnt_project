const User = require("../Database/Userdatabase");
const { body, validationResult } = require("express-validator");
const { hashPassword } = require("../PasswordEncryptor/encrypt");

// Function for creating new user.
const createuser = async (req, res) => {
  let errormessage = {
    success: false,
    message: "",
  };

  let successmessage = {
    success: true,
    message: "",
  };
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const body = req.body;
  if (!body || !body.name || !body.username || !body.email || !body.password) {
    errormessage.message = "User SignUp failed!! All fields Required..";
    return res.status(400).json(errormessage);
  }

  // Checking if the username already exists or not..
  const message = await checkUser(body.username, body.email);
  if (message != null) {
    errormessage.message = message;
    console.log(errormessage);
    return res.status(400).json(errormessage);
  }

  //If All the information is correct and Available...
  const data = {
    name: body.name,
    username: body.username,
    email: body.email,
    password: await hashPassword(body.password),
  };
  await User.create(data);
  successmessage.message = "User Registered Successfully";
  return res.status(200).json(successmessage);
};

// Validation middleware
const validateInput = [
  // Validation checks using express-validator
  body("username")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters long"),
  body("email").isEmail().normalizeEmail().withMessage("Invalid email"),
  body("password")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters long")
    .matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{5,}$/)
    .withMessage(
      "Password must contain at least one uppercase letter, one number, and one special character"
    ),
];

// Function to check if username and email provided already exists in the Database...
const checkUser = async (username, email) => {
  const user = await User.findOne({ username: username });
  const user_email = await User.findOne({ email: email });
  if (user != null) {
    return "Username Already in Use. SignUp failed!";
  } else if (user_email != null) {
    return "Email Id Already in Use. SignUp failed!";
  } else {
    return null;
  }
};

module.exports = { createuser, validateInput };
